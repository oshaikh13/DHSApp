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
   'dhs.news',
   'dhs.status',
   'dhs.skyward'
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

  .state('app.status', {
    url: '/status',
    views : {
      'menuContent' : {
        templateUrl: 'status/status.html'
      }
    }
  })

  .state('app.news', {
    url: '/news',
    views : {
      'menuContent' : {
        templateUrl: 'news/news.html'
      }
    }
  })

  .state('app.skyward', {
    url: '/skyward',
    views : {
      'menuContent' : {
        templateUrl: 'skyward/skyward.html'
      }
    }
  })
})

.run(function($state) {
  $state.go('app.home');
});
