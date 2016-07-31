angular
  .module("app", [
    'ngRoute',
    'ngMaterial',
    'app.methods',
    'app.list',
    'app.detail',
    'app.toolbox'
  ])
  .config(function($locationProvider, $routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
    // $locationProvider.html5Mode(true);
  })
  .controller('AppController', function($scope, $q, $location, methods) {
    $scope.personelType = 'health';

    methods.then(function (ms) {
      $scope.methods = ms;
    })

    //TODO: use select instead of location.
    $scope.$watch('selectedItem', function(method) {
      if (method) {
        $scope.select(method.ID);
      } else {
        $location.path('/');
      }
    });

    $scope.select = function (index) {
      $location.path('/' + index);
    }

    $scope.searchFor = function (substr) {
      return function (text) {
        return text.indexOf(substr) !== -1;
      }
    }

    $scope.search = function (text) {
      return $q(function(resolve, reject){
        if (!text) {
          resolve($scope.methods);
        } else {
          resolve($scope.methods.filter(function (method) {
            try {
              var names = [method.Komponent];
              names = names.concat(method['Alternativa Sökord'].split(', '));
              return names.reduce(function(found, name){
                return found || name.toLowerCase().indexOf(text.toLowerCase()) != -1;
              }, false);
            } catch (e) {
              return false;
            }
          }));
        }
      });
    };
  });