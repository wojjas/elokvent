(function () {
  'use strict';

  var controllerId = 'WordController';

  angular.module('elokvent.modules')
    .controller(controllerId, ['$scope', '$ionicSlideBoxDelegate', 'pxWords', 'pxSettings', word]);

  function word($scope, $ionicSlideBoxDelegate, pxWords, pxSettings) {
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
      pxWords.sliderIndex = index;
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

    function setCurrentSliderIndex() {
      pxWords.sliderIndex = pxWords.sliderIndex || 0;
      vm.activeSlide = pxWords.sliderIndex;
    }
  }
})();
