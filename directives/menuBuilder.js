/*
create a seperate module for menu builder
is responsible for building menu with builder pattern (creational)
will have methods that will build <li>,<a>,<ul>, with appropriate classes injected based on metadata definition
will also include method for deadlock detection/cyclic menu building. [avoid repeating parent menu items as childs of current item]
psudo code {
	for each root category {
		create(<li>) {
			if has childs {
				createlink(<a>);
				create(ul)
			}
		}
	}
}
*/

var categoryMenuDirective = angular.module('phulrani.categoryMenuDirective', ['categoriesStore.services']);

categoryMenuDirective.directive('categoriesMenu', function (CategoriesStore, $timeout) {
    return {
        restrict: 'E',
        //require: '^ngModel',
        scope: {
            ngModel: '='
        },
        template: "",
        replace: true,
        compile: function () {

            var preProcessSmartMenuItem = function (element) {
                element.addClass('sm').smartmenus({

                    // these are some good default options that should work for all
                    // you can, of course, tweak these as you like
                    subMenusSubOffsetX: 2,
                    subMenusSubOffsetY: -6,
                    subIndicatorsPos: 'append',
                    subIndicatorsText: '...',
                    collapsibleShowFunction: null,
                    collapsibleHideFunction: null,
                    rightToLeftSubMenus: element.hasClass('navbar-right'),
                    bottomToTopSubMenus: element.closest('.navbar').hasClass('navbar-fixed-bottom'),
                    markCurrentItem: true
                })
                    // set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
                    .find('a.current').parent().addClass('active');

                element.bind({
                    // set/unset proper Bootstrap classes for some menu elements
                    'show.smapi': function (e, menu) {
                        var $menu = $(menu),
                            $scrollArrows = $menu.dataSM('scroll-arrows'),
                            obj = $(this).data('smartmenus');
                        if ($scrollArrows) {
                            // they inherit border-color from body, so we can use its background-color too
                            $scrollArrows.css('background-color', $(document.body).css('background-color'));
                        }
                        $menu.parent().addClass('open' + (obj.isCollapsible() ? ' collapsible' : ''));
                    },
                    'hide.smapi': function (e, menu) {
                        $(menu).parent().removeClass('open collapsible');
                    },
                    // click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
                    'click.smapi': function (e, item) {
                        var obj = $(this).data('smartmenus');
                        if (obj.isCollapsible()) {
                            var $item = $(item),
                                $sub = $item.parent().dataSM('sub');
                            if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
                                obj.itemActivate($item);
                                obj.menuHide($sub);
                                return false;
                            }
                        }
                    }
                });

                $.SmartMenus.prototype.isCollapsible = function () {
                    return this.$firstLink.parent().css('float') != 'left';
                };

            };

            var isCyclicMenuDefinition = function (parentNodes, childNodes) {
                if (parentNodes && childNodes && angular.isArray(parentNodes) && angular.isArray(childNodes)) {
                    var commonNodes = _.intersection(parentNodes, childNodes);
                    if (commonNodes.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            };
            var render_selection = function () {
                $(this).closest("ul").children(".active").removeClass("active").children(".current").removeClass("current");
                $(this).addClass("active").children("a").addClass("current");
            };
            var createMenuItem = function (category, parentCategories) {
                var menuItem = angular.element('<li id="cat_' + category.id + '"></li>');
                var menuLink = angular.element('<a>' + category.name + '</a>');
                var parentCategories = [];
                var menuItemPromise = $.Deferred();
                

                if (category.childs.length > 0) {
                    menuItem.addClass('dropdown');
                    menuItem.append(menuLink);
                    parentCategories.push(category.id);
                    var subMenu = angular.element('<ul class="dropdown-menu"></ul>');
                    for (childCategoryID in category.childs) {
                        var subCategoryFetchPromise = CategoriesStore.getCategoryByID(category.childs[childCategoryID]);
                        subCategoryFetchPromise.then(function (subCategory) {
                            if (isCyclicMenuDefinition(parentCategories, subCategory.childs)) {
                                alert('Category [' + subCategory.name + '] definition has Cyclic refrence, please correct it');
                                return null;
                            } else {
                                var subMenuItemPromise = createMenuItem(subCategory, parentCategories);
                                subMenuItemPromise.then(function (subMenuItem) {
                                    subMenu.append(subMenuItem);
                                    menuItem.append(subMenu);
                                    menuItemPromise.resolve(menuItem);
                                });
                            }
                        });
                    }

                } else {
                    menuLink.attr('href', '#/category/' + category.id);
                    menuItem.on("click", render_selection);
                    menuItem.append(menuLink);
                    menuItemPromise.resolve(menuItem);
                }
                return menuItemPromise;
            };

            var link = function (scope, element, attr) {
                var menuBar = angular.element('<ul class="nav navbar-nav"></ul>');
                var homeMenuItem = angular.element('<li class=""><a href="#/home">Home <span class="sr-only"></span></a></li>').on("click", render_selection);
                menuBar.append(homeMenuItem);

                var rootCategoriesFetchPromise = CategoriesStore.getRootCategories();
                rootCategoriesFetchPromise.then(function (rootCategories) {
                    for (category in rootCategories) {
                        var menuItemPromise = createMenuItem(rootCategories[category], []);  // keep the parent categories empty initially for every root
                        menuItemPromise.then(function (menuItem) {
                            menuBar.append(menuItem);

                        });
                    }
                    element.append(menuBar);
                    //NR: workaround to init smart menu explicitly, as angular renders async
                    $timeout(function () { preProcessSmartMenuItem(menuBar); }, 100);
                });

            };
            return link;
        }
    };
});