/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * controller in <%= cameledName %>
 */

angular.module('<%= scriptAppName %>')
  .controller('<%= cameledName %>Ctrl', ($scope) => {

  })

  .config(($stateProvider) => {
    // Application routing
    $stateProvider
      .state('app.<%= cameledName %>', {
        url: '/<%= cameledName %>',
        cache: true,
        views: {
          app: {
            templateUrl: 'src/pages/<%= cameledName %>/<%= cameledName %>.html',
            controller: '<%= cameledName %>Ctrl'
          }
        }
      })
  })
