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
      template: '<span></span>',
      link: (scope, elem, attr) => {
      }
    }
  })
