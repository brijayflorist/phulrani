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
            url: '/category/:categoryID',
            resolve: {
                productsByCategory: function (ProductsStore, $stateParams) { return ProductsStore.getProductsByCategory($stateParams.categoryID); }
            },
            views: {
                'PageContent@': {
                    templateUrl: "views/categories/categoryDetails.html",
                    controller: "categoryDetailsController"
                }
            }
        }

    );

});