/**
 * Created by craigc on 8/21/14.
 */
angular
    .module('partners')
    .controller('InvestmentCtrl', ['$scope', '$http', InvestmentCtrl]);

function InvestmentCtrl ($scope, $http) {
    $scope.investForm = {};

    $scope.submitInvestment = function(){


        $http.post('/InvestmentForm', $scope.investForm)
            .success(function(data){
                $scope.investForm = {};
                $scope.investFormData = data;
                console.log('data', data);

            })
            .error(function(err){
                console.log('Error' + data);
            })
    };

    console.log("InvestmentCtrl");
}

