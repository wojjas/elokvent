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
    var indexOfLatestWord = 0;             //Latest word shown, the "new" word.
    var indexOfCurrentWord = 0;            //The word displayed right now.
    var nofShownWords = 0;

    vm.isForegaendeDisabled = isForegaendeDisabled;
    vm.isNastaDisabled = isNastaDisabled;
    vm.showNextWord = showNextWord;
    vm.showPreviousWord = showPreviousWord;
    vm.showLetestWord = showLetestWord;
    vm.activate = activate;

    activate();

    function activate() {
      indexOfLatestWord = pxWords.getIndexOfLatestWord();
      indexOfCurrentWord = pxWords.currentWordIndex !== null ? pxWords.currentWordIndex : indexOfLatestWord;
      nofShownWords = pxWords.getNofShownWords();
    }

    function showNextWord() {
      indexOfCurrentWord += 1;

      pxWords.setCurrentWord(indexOfCurrentWord);
    }

    function showPreviousWord() {
      indexOfCurrentWord -= 1;

      pxWords.setCurrentWord(indexOfCurrentWord);
    }

    function showLetestWord() {
      indexOfCurrentWord = indexOfLatestWord;

      pxWords.setCurrentWord(indexOfCurrentWord);
    }

    function isForegaendeDisabled() {
      return nofShownWords <= 1 || indexOfCurrentWord == 0;
    }

    function isNastaDisabled() {
      return indexOfLatestWord == indexOfCurrentWord;
    }
  }
})();
