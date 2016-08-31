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

      setCurrentWord('respectCurrent');
      $interval(setCurrentWord, 20000);   //periodically check if time to show new word

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
        var hourOfDay = null;

        pxWords.setWords(words);
        currentlyLatest = pxWords.getLatestWord();

        pxSettings.psGetData().then(function (data) {
          var tmpData = pxSettings.setData(data);
          nofDaysBetweenWords = pxSettings.getNewWordIntervalInDays(tmpData.newWordInterval);
          hourOfDay = tmpData.newWordTime;

          //Update latest word if needed and permitted by settings
          if (now.diff(currentlyLatest.premiereDate, 'days') >= nofDaysBetweenWords &&
            now.hour() == hourOfDay) {
            pxWords.setLatestWord(now);

            //$timeout not needed since $interval is used to get here
            pxWords.currentWord = pxWords.getLatestWord();
          }
          else if (respectCurrent === 'respectCurrent') {
            //since invoked from activate() we need to put this setting into queue using $timeout
            $timeout(function () {
              pxWords.currentWord = pxWords.currentWord || pxWords.getLatestWord();
            }, 0, true);
          }
        });
      })
    }

    function setCurrentSliderIndex() {
      pxWords.currentSliderIndex = pxWords.currentSliderIndex || 0;
      vm.activeSlide = pxWords.currentSliderIndex;
    }
  }
})();
