angular.module('dhs.status', [])

.controller('statusCtrl', function ($scope, Status) {
  $scope.description = "Loading..."
  $scope.currentStatus = "";
  $scope.lastUpdated = "";

  Status.getStatus(function(success, res){
    if (success) {
      console.log(res);
      $scope.description = res.description;
      $scope.currentStatus = res.status;
      $scope.lastUpdated = moment(res.lastUpdated).format('LL');
    }
  })

});