(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', 'pxSettings', settings]);

  function settings($scope, pxSettings) {
    var vm = this;

    vm.newWordInterval = null;
    vm.newWordIntervalChanged = newWordIntervalChanged;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      vm.newWordInterval = pxSettings.getData().newWordInterval;
    }

    function newWordIntervalChanged() {
      var data = {};
      data['newWordInterval'] = vm.newWordInterval;

      pxSettings.setData(data);
    }
  }
})();
