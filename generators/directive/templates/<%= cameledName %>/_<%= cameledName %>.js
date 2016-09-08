'use strict'
/**
 * @ngdoc function
 * @name <%= scriptAppName %>.<%= cameledName %> directive
 * @description
 * # <%= cameledName %> directive
 */

angular.module('<%= scriptAppName %>')
  .directive('<%= cameledName %>', () => {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'src/components/directives/<%= cameledName %>/<%= cameledName %>.html',

      link: (scope, elem, attr) => {

      }
    }
  })
