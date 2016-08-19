(function () {
  'use strict';

  /*
   Latest word is the one shown or to be shown as the latest word.
   Latest word is updated with a newer one when currently set latest word is older then an amount of time (set in settings), say two days.
   Current word is the one currently shown (user may choose to show older words and then newer again untill latest word)
   */

  var serviceId = 'pxWords';

  angular.module('elokvent.comm')
    .factory(serviceId, ['$http', pxWords]);

  function pxWords($http) {

    var START_OF_MILLENIUM = 949359600000;
    words: null;                                    //the array with all the words objects

    var service = {
      currentWord: null,                            //the currently shown word, (not the latest)
      currentWordIndex: null,
      currentSliderIndex: null,                     //if the word or its description is being shown

      getIndexOfLatestWord: getIndexOfLatestWord,
      getLatestWord: getLatestWord,
      setLatestWord: setLatestWord,
      setCurrentWord: setCurrentWord,
      getWord: getWord,

      getNofShownWords: getNofShownWords
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function getIndexOfLatestWord() {
      var words = getWords(this);
      var len = words.length;
      var i;

      for (i = 0; i < len; i++) {
        if (!words[i].premiereDate) {
          break;
        }
      }

      return i - 1;
    }

    //Currently latest, may need to be upgraded with a newer one (logic for that is outside this service)
    function getLatestWord() {
      var words = getWords(this);

      return words[this.getIndexOfLatestWord()];
    }

    function setLatestWord(premiereDate) {
      var words = getWords(this);
      var index = this.getIndexOfLatestWord();

      //Do nothing if we ran out of words
      if (index + 1 < words.length) {
        words[this.getIndexOfLatestWord() + 1].premiereDate = premiereDate.valueOf();
      }
    }

    function setCurrentWord(index) {
      var words = getWords(this);
      this.currentWordIndex = index;
      this.currentWord = words[index];
    }

    function getWord(index) {
      var words = getWords();

      return words ? words[index] : null;
    }

    function getNofShownWords() {
      var retVal = 0;
      var words = getWords(this);

      angular.forEach(words, function (value) {
        if (value.premiereDate) {
          retVal += 1;
        }
      });

      return retVal;
    }

    // Private ////////////////////////////////////////////////////////////////

    function getWords(obj) {

      var wordsFromDb = [
        {
          "word": "konflux",
          "description": "konstant förändring",
          "premiereDate": START_OF_MILLENIUM,
          "favorite": "false"
        },
        {"word": "legär", "description": "lättvändig vårdslös", "premiereDate": "", "favorite": "false"},
        {"word": "obsolet", "description": "föråldrad", "premiereDate": "", "favorite": "false"},
        {
          "word": "kverulera",
          "description": "klaga ofta, i onödan och på ett irriterande sätt och utan att försöka göra något åt saken",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "alludera",
          "description": "alludera på, anspela på, väcka association till något (utan att direkt ange källan)",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "diskrepans",
          "description": "ej överensstämmande, avvikelse",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "graverande",
          "description": "allvarlig, som har eller kan ha svåra följder",
          "premiereDate": "",
          "favorite": "false"
        },
        {"word": "illuster", "description": "mycket framstående och berömd", "premiereDate": "", "favorite": "false"},
        {"word": "barock", "description": "fullständigt orimlig", "premiereDate": "", "favorite": "false"},
        {
          "word": "bilateral",
          "description": "ömsesidigt förpliknande, t.ex. om avtal mellan två parter",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "frappera",
          "description": "göra starkt intryck på någon genom någon framträdande egenskap",
          "premiereDate": "",
          "favorite": "false"
        },
        {"word": "panegyrisk", "description": "överdrivet lovprisande", "premiereDate": "", "favorite": "false"},
        {
          "word": "deflation",
          "description": "generellt prisfall, uppgång ava penningvärdet",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "betaversion",
          "description": "preliminär version av t.ex. programvara",
          "premiereDate": "",
          "favorite": "false"
        },
        {"word": "derangera", "description": "bringa i oordning", "premiereDate": "", "favorite": "false"},
        {
          "word": "abstrus",
          "description": "dunkel, svårbegriplig, svårförståelig",
          "premiereDate": "",
          "favorite": "false"
        },
      ];

      if (!obj.words) {
        obj.words = wordsFromDb;
      }

      return obj.words;
    }

  }
})();
