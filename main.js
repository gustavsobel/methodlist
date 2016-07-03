var app = angular.module("MethodApp", ['ngMaterial']);

app.controller("MethodController", function($scope) {
  $scope.personelType = 'health';

  this.select = function (method) {
    this.selectedItem = method;
  }

  this.querySearch = function (text) {
    if (!text) {
      return methods;
    } else {
      return methods.filter(function (method) {
        console.log(method, text);
        return method.name.match(new RegExp(text, 'gi'));
      });
    }
  };
});
