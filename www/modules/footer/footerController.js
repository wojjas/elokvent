(function () {
  'use strict';

  var controllerId = 'FooterController';

  /*
   Gives possibility to show Föregående and Nästa word. Enables/Disables the two buttons as appropriate.
   */
  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', 'pxWords', footer]);

  function footer($scope, pxWords) {
    var vm = this;

    vm.pxWordsService = null;

    vm.isForegaendeDisabled = isForegaendeDisabled;
    vm.isNastaDisabled = isNastaDisabled;
    vm.showNextWord = showNextWord;
    vm.showPreviousWord = showPreviousWord;
    vm.showLetestWord = showLetestWord;
    vm.activate = activate;

    activate();

    function activate() {
      vm.pxWordsService = pxWords;

      pxWords.psGetWords().then(function (words) {
        pxWords.setWords(words);

        //TODO: move to some better init place
        pxWords.currentWordIndex = pxWords.currentWordIndex !== null ? pxWords.currentWordIndex : pxWords.getIndexOfLatestWord();
      })
    }

    function showNextWord() {
      pxWords.currentWordIndex += 1;
      pxWords.setCurrentWord();
    }

    function showPreviousWord() {
      pxWords.currentWordIndex -= 1;
      pxWords.setCurrentWord();
    }

    function showLetestWord() {
      pxWords.currentWordIndex = pxWords.getIndexOfLatestWord();
      pxWords.setCurrentWord();
    }

    function isForegaendeDisabled() {
      var nofShownWords = pxWords.getNofShownWords();
      return nofShownWords <= 1 || pxWords.currentWordIndex == 0;
    }

    function isNastaDisabled() {
      return pxWords.getIndexOfLatestWord() === pxWords.currentWordIndex;
    }
  }
})();
