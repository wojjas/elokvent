(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$ionicSlideBoxDelegate', '$timeout', 'pxWords', 'pxSettings', word]);

  function word($scope, $ionicSlideBoxDelegate, $timeout, pxWords, pxSettings) {
    var vm = this;

    vm.pxWordsService = null;
    vm.slideWordDescription = slideWordDescription;
    vm.saveNewSlideIndex = saveNewSlideIndex;
    vm.activate = activate;

    activate();

    $scope.$on('$ionicView.enter', function (e) {
      activate();
    });

    function activate() {
      vm.pxWordsService = pxWords;

      setCurrentWord();
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

    function setCurrentWord() {
      pxWords.psGetWords().then(function (words) {
        var tmpWords = null;
        var currentlyLatest = null;
        var now = moment();
        var nofDaysBetweenWords = null;

        pxWords.setWords(words);
        currentlyLatest = pxWords.getLatestWord();

        pxSettings.psGetData().then(function (data) {
          pxSettings.setData(data);
          nofDaysBetweenWords = pxSettings.getNewWordIntervalInDays();

          //Update latest word if needed
          if (now.diff(currentlyLatest.premiereDate, 'days') > nofDaysBetweenWords) {
            pxWords.setLatestWord(now);
          }

          $timeout(function () {
            pxWords.currentWord = pxWords.currentWord || pxWords.getLatestWord();
          }, 0);
        });
      })
    }

    function setCurrentSliderIndex() {
      pxWords.currentSliderIndex = pxWords.currentSliderIndex || 0;
      vm.activeSlide = pxWords.currentSliderIndex;
    }
  }
})();
