(function () {
  'use strict';

  var controllerId = 'FooterController';

  /*
   Gives possibility to show Föregående and Nästa word. Enables/Disables the two buttons as appropriate.
   */
  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', footer]);

  function footer($scope) {
    var vm = this;
    var nofShownWords = 0;

    vm.isForegaendeDisabled = isForegaendeDisabled;
    vm.isNastaDisabled = isNastaDisabled;
    vm.activate = activate;

    activate();

    function activate() {
      var MainCtrl = $scope.$parent.MainCtrl;

      nofShownWords = MainCtrl.nofShownWords;
    }

    function isForegaendeDisabled() {
      return nofShownWords <= 1;
    }

    function isNastaDisabled() {
      return true;
    }
  }
})();
