/**
 * @ngdoc function
 * @name <%= appName %>.test directive
 * @description
 * # test directive
 */

angular.module('<%= appName %>')
  .directive('test', () => {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'src/components/directives/test/test.html',

      link: function(scope, elem, attr) {

      }
    }
  })
