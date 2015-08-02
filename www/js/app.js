// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('directry', ['ionic', 'directory.controllers', 'directory.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }


    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function(data){
          alert('error: ' + data.error +
              ', reason: ' + data.reason +
              ', adNetwork:' + data.adNetwork +
              ', adType:' + data.adType +
              ', adEvent:' + data.adEvent); // adType: 'banner', 'interstitial', etc.
        });
        document.addEventListener('onAdLoaded', function(data){});
        document.addEventListener('onAdPresent', function(data){});
        document.addEventListener('onAdLeaveApp', function(data){});
        document.addEventListener('onAdDismiss', function(data){});
    }

    if(window.AdMob) {
                var admobid;

                if (device.platform == "Android") {
                    admobid = { // for Android
                        banner: 'ca-app-pub-6699142760491850/5045443529',
                        interstitial: 'ca-app-pub-6699142760491850/8733293122'
                    };
                } else {
                    admobid = { // for iOS
                        banner: 'ca-app-pub-6699142760491850/5045443529',
                        interstitial: 'ca-app-pub-6699142760491850/8733293122'
                    };
                }

                $adMob.createBanner( {
                    adId: admobid.banner,
                    autoShow: true,
                    bgColor: 'black',
                    position: $adMob.position.BOTTOM_CENTER
                });

                $adMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: true
                });
                
                if(window.AdMob) window.AdMob.showInterstitial();
            }
  })
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tab.all', {
      cache: false,
      url: '/all',
      views: {
        'tab-all': {
          templateUrl: 'templates/tab-all.html',
          controller: 'DirectoryAllCtrl'
        }
      }
    })
    .state('tab.all-detail', {
      cache: false,
      url: '/all/:detailId',
      views: {
        'tab-all': {
          templateUrl: 'templates/tab-all-detail.html',
          controller: 'DirectoryAllDetailCtrl'
        }
      }
    })
    .state('tab.emergency', {
      cache: false,
      url: '/emergency',
      views: {
        'tab-emergency': {
          templateUrl: 'templates/tab-emergency.html',
          controller: 'DirectoryEmergencyCtrl'
        }
      }
    })
    .state('tab.emergency-detail', {
      cache: false,
      url: '/emergency/:detailId',
      views: {
        'tab-emergency': {
          templateUrl: 'templates/tab-emergency-detail.html',
          controller: 'DirectoryEmergencyDetailCtrl'
        }
      }
    })
    .state('tab.offices', {
      cache: false,
      url: '/offices',
      views: {
        'tab-offices': {
          templateUrl: 'templates/tab-offices.html',
          controller: 'DirectoryOfficesCtrl'
        }
      }
    })
    .state('tab.offices-detail', {
      cache: false,
      url: '/offices/:detailId',
      views: {
        'tab-offices': {
          templateUrl: 'templates/tab-offices-detail.html',
          controller: 'DirectoryOfficesDetailCtrl'
        }
      }
    })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/emergency');
})
