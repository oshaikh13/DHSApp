angular.module('dhs.services', [])

.factory('SkywardAuth', function ($http, $rootScope) {
  var authentication = {};

  authentication.getGradeBook = function(username, pass, cb) {

    console.log(username);
    console.log(pass);

    if (username.toLowerCase() === "dhs sucks") {
      cb(false, {data: {error: "lol true"}});
      return;
    }

    if (!username || !pass || username.length < 1 || pass.length < 1) {
      cb(false, {data: {error: "Try typing something in..."}});
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