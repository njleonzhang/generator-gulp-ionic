/**
 * @ngdoc function
 * @name <%= appName %>.controller:mainCtrl
 * @description
 * # mainCtrl
 */

angular.module('<%= appName %>')
  .controller('mainCtrl', function($scope) {

  })

  .config(function($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/pages/main/main.html',
        controller: 'mainCtrl'
      })
  })
