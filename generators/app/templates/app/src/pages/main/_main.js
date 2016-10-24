/**
 * @ngdoc function
 * @name <%= appName %>.controller:mainCtrl
 * @description
 * # mainCtrl
 */

angular.module('<%= appName %>')
  .controller('mainCtrl', ($scope) => {

  })

  .config(($stateProvider) => {
    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/pages/main/main.html',
        controller: 'mainCtrl'
      })
  })
