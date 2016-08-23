(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$timeout', 'pxSettings', settings]);

  function settings($scope, $timeout, pxSettings) {
    var vm = this;

    vm.newWordInterval = null;
    vm.newWordIntervalChanged = newWordIntervalChanged;
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
        }, 0);
      });
    }

    function newWordIntervalChanged() {
      var data = {newWordInterval: vm.newWordInterval};

      pxSettings.setData(data);
    }
  }
})();
