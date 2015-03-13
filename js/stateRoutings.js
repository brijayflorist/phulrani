phulrani.config(function ($stateProvider, $urlRouterProvider) {
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    //Default Route
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('main', {
            url: '',
            abstract: true,
            views : {
                'HeadBanner': {
                    templateUrl: "views/main/banner.html",
                    controller: 'bannerController'
                },
                'NavigationMenu': {
                    templateUrl: "views/main/navigationMenu.html",
                    controller: 'navigationMenuController'
                 },	
                'PageContent': {
                    templateUrl: "views/main/homePageContent.html",
                    controller: 'homePageController'
                },
                'FooterContent': {
                    templateUrl: "views/main/footerContent.html",
                    controller: 'footerPageController'
                }					
            }
        })
        .state('main.home', {
            url: '/home',
            views : {
				'PageContent@': {
					templateUrl: "views/main/homePageContent.html",
					controller: 'homePageController'
				}				
			}
        })
        .state('main.category', {
            url: '/category/:categoryID',   //NR: keeping this way for URL based category access. Can be also achieved using below search.
            resolve: {
                productsFiltered: function (ProductsStore, $stateParams) { return ProductsStore.getProductsByCategory($stateParams.categoryID); },
                category: function (CategoriesStore, $stateParams) { return CategoriesStore.getCategoryByID($stateParams.categoryID); }
            },
            views: {
                'PageContent@': {
                    templateUrl: "views/products/productsList.html",
                    controller: "productsFilterController"
                }
            }
        })
        .state('main.search', {
            resolve: {
                productsFiltered: function (ProductsStore, $stateParams) { return ProductsStore.search($stateParams.categoryID, $stateParams.key, $stateParams.sort, $stateParams.price_range); },
                category: function (CategoriesStore, $stateParams) { return CategoriesStore.getCategoryByID($stateParams.categoryID); }
            },
            views: {
                'PageContent@': {
                    templateUrl: "views/products/productsList.html",
                    controller: "productsFilterController"
                }
            },
            params: {'categoryID':'', 'key':'', 'sort':'', 'price_range':''}
        });

});