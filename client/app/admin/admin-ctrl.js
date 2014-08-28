angular
  .module('partners')
  .controller('AdminCtrl', ['$scope', '$http', AdminCtrl]);

function AdminCtrl ($scope, $http) {
  $scope.isAdmin = true;
  console.log("AdminCtrl");
}
