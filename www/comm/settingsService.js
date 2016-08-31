(function () {
  'use strict';

  var serviceId = 'pxSettings';

  angular.module('elokvent.comm')
    .factory(serviceId, ['$http', pxSettings]);

  function pxSettings($http) {
    //Hardcoded default values:
    var data = {
      newWordInterval: 'daily',
      newWordTime: '9',
      pushNotifications: true
    };

    // Public members: ////////////////////////////////////////////////////////
    var service = {
      //ps stands for Persistent Storage
      psSetData: psSetData,
      psGetData: psGetData,

      setData: setData,
      getData: getData,

      getNewWordIntervalInDays: getNewWordIntervalInDays
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function psGetData() {
      return localforage.getItem('settings');
    }

    //Save to persistent storage!
    function psSetData(d) {
      d = d || data;

      localforage.setItem('settings', d).catch(function (err) {
        console.log('Failed to save settings to persistent storage, reason: ' + err);
      });
    }

    //if d is null default data will be set and returned
    function setData(d) {
      if (d) {
        data = d;
      }
      else {
        psSetData();  //and save default data to persistent storage
      }

      return data;
    }

    function getData() {
      return data;
    }

    function getNewWordIntervalInDays(newWordInterval) {
      var retVal = 2;   //hardcoded default value

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
  }
})();
