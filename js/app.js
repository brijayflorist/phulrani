// Globar Constants
//https://help.yahoo.com/kb/yahoo-merchant-solutions/facebook-application-sln18861.html
var FB_APP_ID = '1608106426069055';  // Nozel FB App ID registered for : http:\\developer.nozel.com

// angular.module is a global place for creating, registering and retrieving Angular modules

var phulrani = angular.module('phulrani', ['ui.router', 'ui.bootstrap', 'ngAnimate', //'ngMaterial',
											'home.banner', 'home.footer', 'home.homePage', 'home.navigation',
                                            'home.productsFilter', 'ezfb'
										  ]);

/*
* App Config 
*/
phulrani.config(function ($logProvider, ezfbProvider) {
    $logProvider.debugEnabled(true);
    // FB Settings : 
    ezfbProvider.setInitParams({
        appId: FB_APP_ID
    });
});

/*
* App Initialization 
*/
phulrani.controller('Init', function ($state) {
    $state.transitionTo('main.home');
});


