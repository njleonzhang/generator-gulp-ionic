/**
 * @ngdoc function
 * @name <%= appName %>.service:exampleService
 * @description
 * # exampleService
 */

angular.module('<%= appName %>')
  .factory('example', ($http, $timeout, $q, ENVconfig) => {
    let kindOfPrivateletiable = 42

    let doSomethingAsync = function() {
      let deferred = $q.defer()
      $timeout(deferred.resolve.bind(null, kindOfPrivateletiable), 1000)
      return deferred.promise
    }

    let fetchSomethingFromServer = function() {
      return $http({
        url: `${ENVconfig.serverBase}api`,
        params: {
          paras: 2
        },
        method: 'GET'
      }).success((data) => {
        console.log('fetched this stuff from server:', data)
      }).error((error) => {
        console.log('an error occured', error)
      })
    }

    // public api
    return {
      doSomethingAsync,
      fetchSomethingFromServer
    }
  })
