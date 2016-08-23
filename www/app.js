// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('elokvent', [
    'ionic',
    'elokvent.modules',
    'elokvent.comm'
  ])

  .run(function ($ionicPlatform, pxWords) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    //Init and test persistent storage:
    //TODO: maybe move to a better place, angular-init of some kind...
    pxWords.psDefineDriver().then(function () {
      return pxWords.psSetDriver();
    }).then(function () {
      // this should alert "cordovaSQLiteDriver" when in an emulator or a device
      console.log('Driver type for persistent storage: ' + localforage.driver());

      return localforage.setItem('testPromiseKey', 'OK');
    }).then(function () {

      return localforage.getItem('testPromiseKey');
    }).then(function (value) {
      console.log('Persistent storage setup: ' + value);
    }).catch(function (err) {
      console.log('Persistent storage setup failed, reason: ' + err);
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'modules/main/main.html'
      })

      .state('main.word', {
        url: '/word',
        views: {
          'main': {
            templateUrl: 'modules/word/word.html',
            controller: 'WordController as WordCtrl'
          },
          'footer@main.word': {
            templateUrl: 'modules/footer/footer.html',
            controller: 'FooterController as FooterCtrl'
          }
        }
      })

      .state('main.settings', {
        url: '/settings',
        views: {
          'main': {
            templateUrl: 'modules/settings/settings.html',
            controller: 'SettingsController as SettingsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main/word');
  });
