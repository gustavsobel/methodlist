angular
  .module("app.spinner", [])
  .directive('spinner', function() {
    return {
        template: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'
      };
  });
