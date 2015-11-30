angular.module('dhs.skyward', [])

.controller('skywardLoginCtrl', function ($ionicPopup, $localStorage, $state, $scope, SkywardAuth, $ionicHistory) {
  
  /// Login page segments

  var errorAlert = function(err){

    $ionicPopup.alert({
      title: 'Error',
      template: '<p class="centered">' + err + '</p>',
      buttons: [
        { 
          text: 'Okay',
          type: 'button-positive'
        }
      ]
    });

  };

  $scope.loginButtonText = "Log in";
  $scope.data = {};

  $scope.login = function() {
    $scope.loggingIn = true;
    $scope.loginButtonText = "Loading...";
    SkywardAuth.getGradeBook($scope.data.username, $scope.data.password, function(success, response){

      if (!success) {

        errorAlert(response.data.error);

      } else {

        $localStorage.userGradeData = response.data;

        $localStorage.loggedIn = true;

        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });

        $localStorage.username = $scope.data.username;
        $localStorage.password = $scope.data.password;

        $state.go('app.skyward');

      }

      $scope.loginButtonText = "Log in";

      $scope.loggingIn = false;
    })
  }

})

.controller('skywardCtrl', function($scope, $localStorage, $ionicHistory, $state, SkywardAuth){

  $scope.refreshButtonText = "Refresh Grades";
  $scope.refreshing = false;
  $scope.userGradeData = $localStorage.userGradeData;

  $scope.seeDetails = function(period){
    console.log(period);
    $state.go("app.skywardGradeView", {"period": period});
  }

  $scope.getGradeStatus = function(grade) {
    if (grade[0]) {
      return grade[0] + '%';
    } 

    return "N/A";
  }

  $scope.refresh = function (){
    console.log('refreshing');
    $scope.refreshing = true;
    $scope.refreshButtonText = "Refreshing";

    SkywardAuth.getGradeBook($localStorage.username, $localStorage.password, function(success, response){

      if (success) {
        $localStorage.userGradeData = response.data;
      }

      $scope.refreshButtonText = "Refresh";
      $scope.refreshing = false;
    })
  }


  $scope.logout = function() {
    $localStorage.$reset();
    
    $ionicHistory.nextViewOptions({
      disableBack: true,
      historyRoot: true
    });

    $state.go('app.home');
  }

})

.controller('skywardGradeViewCtrl', function($stateParams, $localStorage, $scope){

  var classId = $stateParams.period;
  var currentClassCategories = $localStorage.userGradeData[classId - 1].categories;
  $scope.pageTitle = $localStorage.userGradeData[classId - 1].name;
  console.log(currentClassCategories);

})











