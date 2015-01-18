// Ionic D-Care App

// angular.module is a global place for creating, registering and retrieving Angular modules

var phulrani = angular.module('phulrani', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngMaterial',
											'home.banner', 'home.footer', 'home.homePage', 'home.navigation'
										  ]);

/*
* App Config 
*/
phulrani.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

/*
* App Initialization 
*/
phulrani.controller('Init', function ($state) {
    $state.transitionTo('main.home');
});


