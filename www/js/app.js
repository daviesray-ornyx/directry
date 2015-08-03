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

    var bannerAdUnit;
    var interstitialAdUnit;
    var isOverlap = true; //true: overlap, false: split
    var isTest = true;
    //android
    if (navigator.userAgent.match(/Android/i)) {
        bannerAdUnit = "ca-app-pub-6699142760491850/5045443529";
        interstitialAdUnit = "ca-app-pub-6699142760491850/8733293122";
    }
    //ios
    else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
      bannerAdUnit = "ca-app-pub-6699142760491850/5045443529";
      interstitialAdUnit = "ca-app-pub-6699142760491850/8733293122";
    }
    //wp8
    else if( navigator.userAgent.match(/Windows Phone/i) ) {
      bannerAdUnit = "ca-app-pub-6699142760491850/5045443529";
      interstitialAdUnit = "ca-app-pub-6699142760491850/8733293122";
    }

    window.admob.setUp(bannerAdUnit, interstitialAdUnit, isOverlap, isTest);

    window.admob.onInterstitialAdPreloaded = function() {
        alert('onInterstitialAdPreloaded');
    };

    window.admob.onInterstitialAdLoaded = function() {
        alert('onInterstitialAdLoaded');
    };
    window.admob.onInterstitialAdShown = function() {
        alert('onInterstitialAdShown');
    };
    window.admob.onInterstitialAdHidden = function() {
        alert('onInterstitialAdHidden');
    };


    window.admob.preloadInterstitialAd();//option, download ad previously for fast show
    window.admob.showInterstitialAd();
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
