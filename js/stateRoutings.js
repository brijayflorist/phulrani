phulrani.config(function ($stateProvider, $urlRouterProvider) {
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    //Default Route
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
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

        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
		.state('category', {
            url: '/category',
            templateUrl: 'views/category.html',
            controller: 'CategoryController'
        });;

});