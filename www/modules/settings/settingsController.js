(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', settings]);

  function settings($scope) {
    var vm = this;

    vm.activate = activate;
    vm.title = 'SettingsController';

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    })

    function activate() {
    }
  }
})();
