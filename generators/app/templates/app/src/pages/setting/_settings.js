/**
 * @ngdoc function
 * @name <%= appName %>.controller:settingCtrl
 * @description
 * # settingCtrl
 */

angular.module('<%= appName %>')
  .controller('settingCtrl', function($scope) {

  })

  .config(function($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'src/pages/setting/settings.html',
            controller: 'settingCtrl'
          }
        }
      });
  });
