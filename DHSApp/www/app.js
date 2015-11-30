// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dhs', 
  ['ionic',
   'ngStorage',
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
        templateUrl: 'status/status.html',
        controller: 'statusCtrl',

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

  .state('app.skywardGradeView', {
    url: '/skywardgrade/:period',
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: 'skyward/grade.html',
        controller: 'skywardGradeViewCtrl'
      }
    }
  })

  .state('app.skywardlogin', {
    url: '/skywardlogin',
    views: {
      'menuContent' : {
        templateUrl: 'skyward/login.html',
        controller: 'skywardLoginCtrl',
        hideBackButton: true
      }
    }
  })

  .state('app.skyward', {
    url: '/skyward',
    cache: false,
    views : {
      'menuContent' : {
        templateUrl: 'skyward/skyward.html',
        controller: 'skywardCtrl',
        hideBackButton: true
      }
    }
  })

})

.run(function($state, $rootScope, $ionicPlatform, TokenSend, $localStorage) {

  // Whatever IP the server is on...
  // Preferably deployed..

  $rootScope.dhsAppServer = "http://dhsapp.herokuapp.com";

  $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);

      if ($localStorage.firstLoad && ($localStorage.currentToken !== token.token)) {
        TokenSend.sendToken(token.token, $localStorage.currentToken);
      } else if (!$localStorage.firstLoad) {
        TokenSend.sendToken(token.token);
        $localStorage.currentToken = token.token;
        $localStorage.firstLoad = true;
      } 

    });
    
  });

  $state.go('app.home');
});


