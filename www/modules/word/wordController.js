(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', 'pxWords', word]);

  function word($scope, pxWords) {
    var vm = this;

    vm.currentWord = null;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      vm.currentWord = pxWords.getNextUnshownWord();
    }
  }
})();
