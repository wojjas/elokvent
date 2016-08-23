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
    var words = null;                               //the array with all the words objects

    var service = {
      currentWord: null,                            //the currently shown word, (not the latest)
      currentWordIndex: null,
      currentSliderIndex: null,                     //if the word or its description is being shown

      getLatestWord: getLatestWord,
      setLatestWord: setLatestWord,
      getIndexOfLatestWord: getIndexOfLatestWord,
      setCurrentWord: setCurrentWord,
      getNofShownWords: getNofShownWords,

      //ps stands for Persistent Storage
      psDefineDriver: psDefineDriver,
      psSetDriver: psSetDriver,
      psGetWords: psGetWords,

      setWords: setWords
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function getIndexOfLatestWord() {
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
      return words[this.getIndexOfLatestWord()];
    }

    function setLatestWord(premiereDate) {
      var index = this.getIndexOfLatestWord();

      //Do nothing if we ran out of words
      if (index + 1 < words.length) {
        words[this.getIndexOfLatestWord() + 1].premiereDate = premiereDate.valueOf();
      }

      //Save to persistent storage!
      psSaveWords();
    }

    function setCurrentWord(index) {
      this.currentWordIndex = index;
      this.currentWord = words[index];
    }

    function getNofShownWords() {
      var retVal = 0;

      angular.forEach(words, function (value) {
        if (value.premiereDate) {
          retVal += 1;
        }
      });

      return retVal;
    }

    function psDefineDriver() {
      return localforage.defineDriver(window.cordovaSQLiteDriver);
    }

    function psSetDriver() {
      return localforage.setDriver([
        // Try setting cordovaSQLiteDriver if available,
        window.cordovaSQLiteDriver._driver,
        // otherwise use one of the default localforage drivers as a fallback.
        // This should allow you to transparently do your tests in a browser
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]);
    }

    function psGetWords() {
      return localforage.getItem('words');
    }

    function setWords(w) {
      if (w && w.length > 0) {   //if supplied w is null or empty, set words to initial-hard-coded values
        if (!words) {            //set only if words is not set yet to avoid triggering a bunch of stuff
          words = w;
        }
      } else {
        words = getInitialWords();
      }
    }

    // Private ////////////////////////////////////////////////////////////////

    function psSaveWords() {
      //We don't care about waiting for the promise to be fulfilled.
      localforage.setItem('words', words).catch(function (err) {
        console.log('Failed to save to persistent storage, reason: ' + err);
      });
    }

    function getInitialWords() {
      var initialWords = [
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

      return initialWords;
    }
  }
})();
