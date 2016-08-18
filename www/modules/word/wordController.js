(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', 'pxWords', 'pxSettings', word]);

  function word($scope, pxWords, pxSettings) {
    var vm = this;

    vm.pxWordsService = null;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      vm.pxWordsService = pxWords;

      setCurrentWord();
    }

    // private: ///////////////////////////////////////////////////////////////

    function setCurrentWord() {
      //Update latest word if needed
      var currentlyLatest = pxWords.getLatestWord();
      var now = moment();
      var nofDaysBetweenWords = pxSettings.getNewWordIntervalInDays();

      if (now.diff(currentlyLatest.premiereDate, 'days') > nofDaysBetweenWords) {
        pxWords.setLatestWord(now);
      }

      pxWords.currentWord = pxWords.currentWord || pxWords.getLatestWord();
    }
  }
})();
