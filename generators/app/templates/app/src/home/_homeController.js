/**
 * @ngdoc function
 * @name <%= appName %>.controller:homeCtrl
 * @description
 * # homeCtrl
 */

angular.module('<%= appName %>')
  .controller('homeCtrl', function($scope, exampleService) {
    $scope.myHTML = null;

    // just an example...
    $scope.fetchRandomText = function () {
      exampleService.doSomethingAsync()
        .then(exampleService.fetchSomethingFromServer)
        .then(function (response) {
          $scope.myHTML = response.data.text;
          // close pull to refresh loader
          $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.fetchRandomText();
  });