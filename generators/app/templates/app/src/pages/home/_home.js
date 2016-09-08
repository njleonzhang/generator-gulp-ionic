/**
 * @ngdoc function
 * @name <%= appName %>.controller:homeCtrl
 * @description
 * # homeCtrl
 */

angular.module('<%= appName %>')
  .controller('homeCtrl', ($scope, example) => {
    $scope.myHTML = null

    // just an example...
    $scope.fetchRandomText = function() {
      example.doSomethingAsync()
        .then(example.fetchSomethingFromServer)
        .then(function(response) {
          $scope.myHTML = response.data.text
          // close pull to refresh loader
          $scope.$broadcast('scroll.refreshComplete')
        })
    }

    $scope.fetchRandomText()
  })
  .config(($stateProvider, $urlRouterProvider) => {
    // Application routing
    $stateProvider
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'src/pages/home/home.html',
            controller: 'homeCtrl'
          }
        }
      })
  })
