/**
 * @ngdoc function
 * @name <%= appName %>.controller:settingCtrl
 * @description
 * # settingCtrl
 */

angular.module('<%= appName %>')
  .controller('settingCtrl', ($scope) => {

  })

  .config(($stateProvider) => {
    // Application routing
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          app: {
            templateUrl: 'src/pages/setting/settings.html',
            controller: 'settingCtrl'
          }
        }
      })
  })
