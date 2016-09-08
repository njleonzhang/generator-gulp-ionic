'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.service:exampleService
 * @description
 * # exampleService
 */

angular.module('<%= appName %>')
  .factory('example', ['$http',
    '$timeout',
    '$q',
    'ENVconfig',
    function ($http, $timeout, $q, ENVconfig) {
      var kindOfPrivateVariable = 42;

      var doSomethingAsync = function () {
        var deferred = $q.defer();
        $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
        return deferred.promise;
      };

      var fetchSomethingFromServer = function () {
        return $http({
          url: ENVconfig.serverBase + 'api',
          params: {
            paras: 2
          },
          method: 'GET'
        })
          .success(function (data) {
            console.log('fetched this stuff from server:', data);
          })
          .error(function (error) {
            console.log('an error occured', error);
          });
      };

      // public api
      return {
        doSomethingAsync: doSomethingAsync,
        fetchSomethingFromServer: fetchSomethingFromServer
      };
    }])
