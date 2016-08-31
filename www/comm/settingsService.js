(function () {
  'use strict';

  var serviceId = 'pxSettings';

  angular.module('elokvent.comm')
    .factory(serviceId, ['$http', pxSettings]);

  function pxSettings($http) {
    var data = null;

    // Public members: ////////////////////////////////////////////////////////
    var service = {
      //ps stands for Persistent Storage
      psGetData: psGetData,
      setData: setData,

      getNewWordIntervalInDays: getNewWordIntervalInDays
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function psGetData() {
      return localforage.getItem('settings');
    }

    function setData(d) {
      if (d) {
        data = d;
      } else {
        data = {
          newWordInterval: 'biDaily'  //default setting hard coded
        };
      }

      //Save to persistent storage!
      psSetData();
    }

    function getNewWordIntervalInDays(newWordInterval) {
      var retVal = 2;

      switch (newWordInterval) {
        case 'daily':
          retVal = 1;
          break;
        case 'biDaily':
          retVal = 2;
          break;
        case 'weekly':
          retVal = 7;
          break;
      }

      return retVal;
    }

    // Private ////////////////////////////////////////////////////////////////

    function psSetData() {
      localforage.setItem('settings', data).catch(function (err) {
        console.log('Failed to save settings to persistent storage, reason: ' + err);
      });
    }
  }
})();
