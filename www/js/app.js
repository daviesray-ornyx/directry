// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('directry', ['ionic', 'directory.controllers', 'directory.services', ])
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

    if ( window.plugins && window.AdMob ) {
      var ad_units = {
        ios : {
          banner: 'ca-app-pub-6699142760491850/5045443529', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-6699142760491850/8733293122'
        },
        android : {
          banner: 'ca-app-pub-6699142760491850/5045443529', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-6699142760491850/8733293122'
        },
        wp8 : {
          banner: 'ca-app-pub-6699142760491850/5045443529', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-6699142760491850/8733293122'
        }
      };

      var admobid = "";
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = ad_units.android;
      } else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = ad_units.ios;
      } else {
        admobid = ad_units.wp8;
      }

      window.AdMob.setOptions( {
        publisherId: admobid.banner,
        interstitialAdId: admobid.interstitial,
        bannerAtTop: false, // set to true, to put banner at top
        overlap: false, // set to true, to allow banner overlap webview
        offsetTopBar: false, // set to true to avoid ios7 status bar overlap
        isTesting: false, // receiving test ad
        autoShow: true // auto show interstitial ad when loaded
      });

      if(window.AdMob) window.AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

        // show the interstitial later, e.g. at end of game level
      if(window.AdMob) window.AdMob.showInterstitial();
      } else {
          alert( 'admob plugin not ready' );
      }
    }


  });

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
