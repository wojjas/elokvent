(function () {
  'use strict';

  var controllerId = 'MainController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$state', 'pxWords', main]);

  function main($scope, $state, pxWords) {
    var vm = this;

    vm.showFooterWordNav = false;

    vm.openSettings = openSettings;
    vm.goToHome = goToHome;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    })

    function activate() {
      //TODO: We go through here to init the settings, get the words-dictionary etc.
      //TODO: If not needed, use $urlRouterProvider.otherwise('/main/word'); in app.js instead.
      pxWords.currentWord = pxWords.getWord(pxWords.getIndexOfLatestWord());
      $state.go('main.word');

      vm.showFooterWordNav = true;
    }

    function openSettings() {
      $state.go('main.settings');
      vm.showFooterWordNav = false;
    }

    function goToHome() {
      $state.go('main.word');
      vm.showFooterWordNav = true;
    }
  }
})();
