angular.module('dhs.services', [])

.factory('TokenSend', function ($http, $rootScope){

  var tokenFact = {};

  var successCallback = function(){
    
  }

  var errorCallback = function(){

  }

  tokenFact.sendToken = function (token, oldToken) {
    var reqData = {
      token: token,
      oldToken: oldToken,
      date: Date.now()
    }

    $http.post($rootScope.dhsAppServer + '/api/push/register/', reqData, 
      successCallback, errorCallback);

  }

  return tokenFact;

})

.factory('Status', function ($http, $rootScope){
  
  var status = {};
  status.getStatus = function(cb) {
    console.log('exec');

    var successCallback = function(response) {
      cb(true, response.data);
    }

    var errorCallback = function(response) {
      cb(false, response.data);
    }

    $http.get($rootScope.dhsAppServer + '/api/status/').then(
      successCallback, errorCallback
    );
  }

  return status;

})

.factory('SkywardAuth', function ($http, $rootScope) {
  var authentication = {};

  authentication.getGradeBook = function(username, pass, cb) {

    console.log(username);
    console.log(pass);

    if (!username || !pass || username.length < 1 || pass.length < 1) {
      cb(false, {data: {error: "Try typing something in..."}});
      return;
    }

    if (username.toLowerCase() === "dhs sucks") {
      cb(false, {data: {error: "lol true"}});
      return;
    }



    var successCallback = function(response) {
      response.data.sort(function(a, b){

        if (a.period > b.period) {
          return 1;
        }

        if (a.period < b.period) {
          return -1;
        }

        return 0;

      });
      cb(true, response);
    }

    var errorCallback = function(response) {
      if (!response.data) {
        response.data = {};
        response.data.error = "Unable to log in. Check internet connection.";
      }
      cb(false, response);
    }

    var data = {username: username, password: pass};

    $http.post($rootScope.dhsAppServer + '/api/skyward/gradebook/', 
      data).then(
      successCallback, errorCallback
    );


  }

  return authentication;
})