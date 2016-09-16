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
          if ((getDiffOfDays(now, currentlyLatest.premiereDate)) >= nofDaysBetweenWords &&
            now.hour() >= hourOfDay) {
            pxWords.setLatestWord(now);

            setCurrentSliderIndex(0);

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

    //Get the difference in days between two dates, regardless of hours and minutes
    function getDiffOfDays(dateA, dateB) {
      //convert both dates to moment.js dates
      var a = moment(dateA);
      var b = moment(dateB);

      //normalize with respect to time of day by setting both to midnight
      a.set({'h': 0, 'm': 0, 's': 0, 'ms': 0});
      b.set({'h': 0, 'm': 0, 's': 0, 'ms': 0});

      return a.diff(b, 'days');
    }

    function setCurrentSliderIndex(index) {
      if (index != undefined) {
        pxWords.currentSliderIndex = index;
      } else {
        pxWords.currentSliderIndex = pxWords.currentSliderIndex || 0;
      }

      $timeout(function () {
        vm.activeSlide = pxWords.currentSliderIndex;
      }, 0, true);
    }
  }
})();
