// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('<%= appName %>', ['ionic', 'ngAnimate', 'ngCordova', 'ENV'])
  .run(($ionicPlatform) => {
    $ionicPlatform.ready(() => {
      // save to use plugins here
    })

    // add possible global event handlers here
  })

  // config
  .config(($urlRouterProvider) => {
    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app/home')
  })
