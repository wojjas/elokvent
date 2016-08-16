(function () {
  'use strict';

  var serviceId = 'pxWords';

  angular.module('elokvent.comm')
    .factory(serviceId, ['$http', pxWords]);

  function pxWords($http) {
    var service = {
      currentWordIndex: 10,
      currentWord: null,

      getIndexOfLatestWord: getIndexOfLatestWord,
      setCurrentWord: setCurrentWord,
      getWord: getWord,

      getNofShownWords: getNofShownWords
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function getIndexOfLatestWord() {
      var words = getWords();
      var len = words.length;
      var i;

      for (i = 0; i < len; i++) {
        if (!words[i].lastShown) {
          break;
        }
      }

      return i;
    }

    function setCurrentWord(index) {
      var words = getWords();
      this.currentWord = words[index];
    }

    function getWord(index) {
      var words = getWords();

      return words ? words[index] : null;
    }

    function getNofShownWords() {
      var retVal = 0;
      var words = getWords();

      angular.forEach(words, function (value) {
        if (value.lastShown) {
          retVal += 1;
        }
      });

      return retVal;
    }

    // Private ////////////////////////////////////////////////////////////////

    function getWords() {
      var words = [
        {"word": "konflux", "description": "konstant förändring", "lastShown": "1", "favorite": "false"},
        {"word": "legär", "description": "lättvändig vårdslös", "lastShown": "1", "favorite": "false"},
        {"word": "obsolet", "description": "föråldrad", "lastShown": "1", "favorite": "false"},
        {
          "word": "kverulera",
          "description": "klaga ofta, i onödan och på ett irriterande sätt och utan att försöka göra något åt saken",
          "lastShown": "1",
          "favorite": "false"
        },
        {
          "word": "alludera",
          "description": "alludera på, anspela på, väcka association till något (utan att direkt ange källan)",
          "lastShown": "1",
          "favorite": "false"
        },
        {"word": "diskrepans", "description": "ej överensstämmande, avvikelse", "lastShown": "1", "favorite": "false"},
        {
          "word": "graverande",
          "description": "allvarlig, som har eller kan ha svåra följder",
          "lastShown": "1",
          "favorite": "false"
        },
        {"word": "illuster", "description": "mycket framstående och berömd", "lastShown": "", "favorite": "false"},
        {"word": "barock", "description": "fullständigt orimlig", "lastShown": "", "favorite": "false"},
        {
          "word": "bilateral",
          "description": "ömsesidigt förpliknande, t.ex. om avtal mellan två parter",
          "lastShown": "",
          "favorite": "false"
        },
        {
          "word": "frappera",
          "description": "göra starkt intryck på någon genom någon framträdande egenskap",
          "lastShown": "",
          "favorite": "false"
        },
        {"word": "panegyrisk", "description": "överdrivet lovprisande", "lastShown": "", "favorite": "false"},
        {
          "word": "deflation",
          "description": "generellt prisfall, uppgång ava penningvärdet",
          "lastShown": "",
          "favorite": "false"
        },
        {
          "word": "betaversion",
          "description": "preliminär version av t.ex. programvara",
          "lastShown": "",
          "favorite": "false"
        },
        {"word": "derangera", "description": "bringa i oordning", "lastShown": "", "favorite": "false"},
        {
          "word": "abstrus",
          "description": "dunkel, svårbegriplig, svårförståelig",
          "lastShown": "",
          "favorite": "false"
        },
      ];

      return words;
    }

  }
})();
