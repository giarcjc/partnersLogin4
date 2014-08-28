/**
 * Created by craigc on 8/21/14.
 */
angular
  .module('partners')
  .controller('AssetsCtrl', ['$scope', '$http', AssetsCtrl]);

function AssetsCtrl ($scope, $http) {
  console.log("AssetsCtrl");
}