angular.module('dhs.menu', [])

.controller('menuCtrl', function ($scope, $localStorage, $ionicHistory) {


  $scope.decideSkyward = function() {
  
    if ($localStorage.loggedIn) {
      return "#/app/skyward"
    } else {
      return "#/app/skywardlogin"
    }
  }

});

