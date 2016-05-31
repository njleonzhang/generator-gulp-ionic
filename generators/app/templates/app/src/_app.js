// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('<%= appName %>', ['ionic', 'ngAnimate', 'ngCordova', 'ENV'])

  .run( [
    '$ionicPlatform',

    function( $ionicPlatform )
    {

      $ionicPlatform.ready(function() {
        // save to use plugins here
      });

      // add possible global event handlers here

    } ] )


  // config
  .config(function ($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/main/main.html',
        controller: 'mainCtrl'
      })
      .state('app.home', {
        url: '/home',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'src/home/home.html',
            controller: 'homeCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        cache: true,
        views: {
          'viewContent': {
            templateUrl: 'src/setting/settings.html',
            controller: 'settingCtrl'
          }
        }
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home');
  });

