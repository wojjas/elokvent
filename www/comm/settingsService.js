(function () {
  'use strict';

  var serviceId = 'pxSettings';

  angular.module('elokvent.comm')
    .factory(serviceId, ['$http', pxSettings]);

  function pxSettings($http) {
    var data = {
      newWordInterval: 'biDaily'               //default setting hard coded
    };

    // Public members: ////////////////////////////////////////////////////////
    var service = {
      getData: getData,
      setData: setData,
      getNewWordIntervalInDays: getNewWordIntervalInDays
    };

    return service;

    ///////////////////////////////////////////////////////////////////////////

    function getData() {
      return data;
    }

    function setData(newData) {
      data.newWordInterval = newData.newWordInterval;
      //TODO: save in persistent storage!
    }

    function getNewWordIntervalInDays() {
      var retVal = 2;

      switch (data.newWordInterval) {
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
