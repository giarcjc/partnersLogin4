angular
  .module('partners')
  .controller('HomeCtrl', ['$scope', '$http', HomeCtrl]);

function HomeCtrl ($scope, $http) {
  $scope.hello = 'age';
  console.log("HomeCtrl");
}
