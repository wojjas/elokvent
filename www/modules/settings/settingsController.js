(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$timeout', 'pxSettings', settings]);

  function settings($scope, $timeout, pxSettings) {
    var vm = this;

    vm.newWordInterval = 'daily';
    vm.newWordTime = '9';
    vm.pushNotifications = true;
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
          vm.newWordInterval = data.newWordInterval;
          vm.newWordTime = data.newWordTime;
          vm.pushNotifications = data.pushNotifications;
        }, 0);
      });
    }

    function saveSettings() {
      var data = {
        newWordInterval: vm.newWordInterval,
        newWordTime: vm.newWordTime,
        pushNotifications: vm.pushNotifications
      };

      pxSettings.setData(data);
    }
  }
})();
