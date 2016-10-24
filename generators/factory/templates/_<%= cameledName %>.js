/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Factory in the <%= scriptAppName %>.
 */
angular.module('<%= scriptAppName %>')
  .factory('<%= cameledName %>', () => {
    // Service logic
    // ...

    let meaningOfLife = 42

    // Public API here
    return {
      someMethod() {
        return meaningOfLife
      }
    }
  })
