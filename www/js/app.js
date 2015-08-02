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

    function onLoad() {
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', initApp, false);
        } else {
            initApp();
        }
    }
	var admobid = {};
	if( /(android)/i.test(navigator.userAgent) ) {
		admobid = { // for Android
			banner: 'ca-app-pub-6699142760491850/5045443529',
			interstitial: 'ca-app-pub-6699142760491850/8733293122'
		};
	}
  else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = { // for iOS
			banner: 'ca-app-pub-6869992474017983/4806197152',
			interstitial: 'ca-app-pub-6869992474017983/7563979554'
		};
	}
  else {
		admobid = { // for Windows Phone
			banner: 'ca-app-pub-6869992474017983/8878394753',
			interstitial: 'ca-app-pub-6869992474017983/1355127956'
		};
	}

    function initApp() {
		  if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
  		initAd();
      // display the banner at startup
      createSelectedBanner();
    }
    function initAd(){
        var defaultOptions = {
            // adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,		// valid when set position to 0 / POS_XY
            // y: integer,		// valid when set position to 0 / POS_XY
            isTesting: false, // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };
        AdMob.setOptions( defaultOptions );
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
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

    if(window.AdMob) window.AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
    // show the interstitial later, e.g. at end of game level
    //if(AdMob) AdMob.showInterstitial();

    // it will display smart banner at top center, using the default options
    if(window.AdMob) window.AdMob.createBanner( {
        adId: admobid.banner,
        position: AdMob.AD_POSITION.TOP_CENTER,
        autoShow: true
      }
    );
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
