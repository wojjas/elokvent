(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$ionicSlideBoxDelegate', '$timeout', '$interval', 'pxWords', 'pxSettings', word]);

  function word($scope, $ionicSlideBoxDelegate, $timeout, $interval, pxWords, pxSettings) {
    var vm = this;

    vm.pxWordsService = null;
    vm.slideWordDescription = slideWordDescription;
    vm.saveNewSlideIndex = saveNewSlideIndex;
    vm.activate = activate;

    activate();

    function activate() {
      vm.pxWordsService = pxWords;

      setCurrentWord(true);
      $interval(setCurrentWord, 20000, false);   //periodically check if time to show new word

      setCurrentSliderIndex();
    }

    //Slides between word and description and back
    function slideWordDescription(index) {
      $ionicSlideBoxDelegate.slide(index, 500);
    }

    function saveNewSlideIndex(index) {
      pxWords.currentSliderIndex = index;
    }

    // private: ///////////////////////////////////////////////////////////////

    function setCurrentWord(respectCurrent) {
      pxWords.psGetWords().then(function (words) {
        var currentlyLatest = null;
        var now = moment();
        var nofDaysBetweenWords = null;

        pxWords.setWords(words);
        currentlyLatest = pxWords.getLatestWord();

        pxSettings.psGetData().then(function (data) {
          pxSettings.setData(data);
          nofDaysBetweenWords = pxSettings.getNewWordIntervalInDays();

          //Update latest word if needed
          if (now.diff(currentlyLatest.premiereDate, 'minutes') > nofDaysBetweenWords) {
            pxWords.setLatestWord(now);
          }

          $timeout(function () {
            if (respectCurrent) {
              pxWords.currentWord = pxWords.currentWord || pxWords.getLatestWord();
            } else {
              pxWords.currentWord = pxWords.getLatestWord();
            }

          }, 0, true);
        });
      })
    }

    function setCurrentSliderIndex() {
      pxWords.currentSliderIndex = pxWords.currentSliderIndex || 0;
      vm.activeSlide = pxWords.currentSliderIndex;
    }
  }
})();
