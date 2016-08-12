(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', word]);

  function word($scope) {
    var vm = this;

    vm.activate = activate;
    vm.title = 'WordController';

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
    }
  }
})();
