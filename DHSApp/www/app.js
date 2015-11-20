// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dhs', 
  ['ionic',
   'dhs.menu',
   'dhs.home',
   'dhs.services',
   ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu/menu.html',
    controller: 'menuCtrl'
  })


  .state('app.home', {
    url: '/home',
    views :{
      'menuContent' : {
        templateUrl: 'home/home.html'
      }
    }
  })

})

.run(function($state) {
  $state.go('app.home');
});
