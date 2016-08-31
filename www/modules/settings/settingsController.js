(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$timeout', 'pxSettings', settings]);

  function settings($scope, $timeout, pxSettings) {
    var vm = this;

    vm.data = {
      newWordInterval: null,
      newWordTime: null,
      pushNotifications: false
    };
    vm.saveSettings = saveSettings;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      pxSettings.psGetData().then(function (data) {
        pxSettings.setData(data);

        $timeout(function () {
          vm.data = data;
        }, 0);
      });
    }

    function saveSettings() {
      pxSettings.setData(vm.data);
    }
  }
})();
