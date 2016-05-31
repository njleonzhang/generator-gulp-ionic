angular.module('<%= appName %>')

  .directive('bsyTabset', function ($ionicScrollDelegate, $timeout) {
    return {
      restrict: 'AE',             // the directive can be element or attribute
      transclude: true,           // any content included between the <BSY-tabset></BSY-tabset> HTML will be inserted
                                  // into the ng-transclude div we specified in the template string.
      scope: {},                  // scope is a object, tab directive's scope is isolated.
      templateUrl: 'js/directives/tabs/tabset.html',
      // the template
      bindToController: true,     // any values passed into the directive's scope via the scope property are
                                  // automatically accessible in the controller using 'this'
      controllerAs: 'tabset',     // allows us to bind properties directly to the controller object
                                  // using 'this' and have them accessible via tabset in the template.
      controller: function () {   // angular controller for the directive
        var self = this;
        self.tabs = [];

        self.addTab = function addTab(tab) {
          self.tabs.push(tab);

          if (self.tabs.length === 1) {
            tab.active = true;
          }
        };

        self.select = function (selectedTab) {
          angular.forEach(self.tabs, function (tab) {
            if (tab.active && tab !== selectedTab) {
              tab.active = false;
            }
          });

          selectedTab.active = true;

          $timeout(function () {
            $ionicScrollDelegate.resize();
          }, 0);
        }
      }
    }
  })

  .directive('bsyTab', function () {
    return {
      restrict: 'AE',
      transclude: true,
      template: '<div class="tab-panel" ng-show="active" ng-transclude></div>',
      scope: {
        heading: '@'    // bind heading in scope to attribute 'heading' on the DOM
      },
      require: '^bsy-tabset',   // searches for the controller 'tabset' on its parents
      link: function (scope, elem, attr, tabsetCtrl) {
        scope.active = false;
        tabsetCtrl.addTab(scope);
      }
    }
  });