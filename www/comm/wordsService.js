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
      if (!words) {
        return 0;
      }

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
      var indexOfCurrentLatest = this.getIndexOfLatestWord();
      var indexOfLatest = indexOfCurrentLatest + 1;

      //Do nothing if we ran out of words
      if (indexOfLatest < words.length) {
        words[indexOfLatest].premiereDate = premiereDate.valueOf();

        this.setCurrentWord(indexOfLatest);

        //Save to persistent storage!
        psSaveWords();
      }
    }

    function setCurrentWord(index) {
      if (index) {
        this.currentWordIndex = index;
        this.currentWord = words[index];
      } else {
        this.currentWord = words[this.currentWordIndex];
      }
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
        {"word": "legär", "description": "lättvindig vårdslös", "premiereDate": "", "favorite": "false"},
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

        {
          "word": "inkognito",
          "description": "under antaget namn (för att inte bli igenkänd)",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "stagflation",
          "description": "konjunkturläge som kännetecknas av låg tillväxt, stor arbetslöshet och hög inflation",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "xylitol",
          "description": "sockeralkohol som framställs genom reduktion av xylos (träsocker)",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "sekundera",
          "description": "hjälpa, bistå",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "skabrös",
          "description": "oanständig",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "rekorderlig",
          "description": "utomordentlig",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "leptosom",
          "description": "kraftlös, orkerslös, svag, vek",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "konsekutiv",
          "description": "som följer efter varandra, följd",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "förmer",
          "description": "snobbig, överlägsen",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "arbitär",
          "description": "godtycklig, ej i förväg bestämd",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "misantropisk",
          "description": "människohatare",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "konspiration",
          "description": "hemligt samarbete",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "rabulist",
          "description": "politisk bråkmakare",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "aristokrati",
          "description": "adel, elit, överklassvälde",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "ultrarapid",
          "description": "inspelningsmetod för film som innebär att kamarean går med högre bildhastighet",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "pekoral",
          "description": "löjlig och dum men allvarligt menad (skrift)",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "inflation",
          "description": "allmänna prishöjningar som innebär att penningsvärdet faller",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "abstrus",
          "description": "dunkel, svårbegriplig, svårförståelig",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "kontemplera",
          "description": "tänka djupt / intensivt",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "homogen",
          "description": "likartad, enhetlig",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "gracil",
          "description": "vackert spenslig, gratiös",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "hasardspel",
          "description": "spel där utgången helt eller huvudsakligen bestäms av slumpen",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "belamra",
          "description": "överhopa på ett hindrande, besvärande eller skrymmande sätt",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "ogin",
          "description": "ohjälpsam, missunnsam",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "affärsängel",
          "description": "person som i tidigt skede satsar kapital och kompetens i nystartade eller växande företag",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "luminös",
          "description": "ljus: lysande, klar",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "kaplan",
          "description": "kapellan, förr benämning på underordnad präst, som nu kallas komminister eller adjunkt",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "obelisk",
          "description": "fyrkantig, avsmalnande pelare med pyramidformad topp",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "monseigneur",
          "description": "(fra., min herre), fransk titel för högerståndspersoner",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "invektiv",
          "description": "förolämpning, skymford, glåpord",
          "premiereDate": "",
          "favorite": "false"
        },
        {
          "word": "gratifikation",
          "description": "extra belöning utöver lön eller arvode, oftast i pengar",
          "premiereDate": "",
          "favorite": "false"
        },

      ];

      return initialWords;
    }
  }
})();
