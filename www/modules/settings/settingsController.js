(function () {
  'use strict';

  var controllerId = 'SettingsController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$timeout', 'pxSettings', settings]);

  function settings($scope, $timeout, pxSettings) {
    var vm = this;

    vm.saveNewWordInterval = saveNewWordInterval;
    vm.saveNewWordTime = saveNewWordTime;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      pxSettings.psGetData().then(function (data) {
        var tmpData = pxSettings.setData(data);

        $timeout(function () {
          vm.data = tmpData;
        }, 0);
      });
    }

    function saveNewWordInterval() {
      pxSettings.psSetData(vm.data);
    }

    function saveNewWordTime() {
      pxSettings.psSetData(vm.data);
    }
  }
})();
