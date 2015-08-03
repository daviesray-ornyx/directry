angular.module('directory.services',[])
  .factory('API', function($rootScope, $http, $ionicLoading, $window){  // this makes lists and other variables accessible to controllers
    var base = "http://directry-serv.azurewebsites.net";    // production
    //var base = "http://localhost:9804";    // development


    var allLoaded = false;
    var allContactProfiles = [];

    var emergencyLoaded = false;
    var emergencyContactProfiles = [];

    var officeLoaded = false;
    var officeContactProfiles = [];

    $rootScope.show = function(text){
      $ionicLoading.show({
        template: text
      });
    };

    $rootScope.hide = function(){
      $ionicLoading.hide();
    };

    $rootScope.notify = function(text){
      $rootScope.show(text);
      $window.setTimeout(function(){
        $rootScope.hide();
      }, 1999);
    };


    $rootScope.initializeAdd = function(){
      try {
        if(AdMob != null){
          alert('Admob ready');
          var admobid = {};
          if( /(android)/i.test(navigator.userAgent) ) { // for android
              admobid = {
                  banner: 'ca-app-pub-6699142760491850/5045443529',
                  interstitial: 'ca-app-pub-6699142760491850/8733293122'
              };
          } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios

              admobid = {
                banner: 'ca-app-pub-6699142760491850/5045443529',
                interstitial: 'ca-app-pub-6699142760491850/8733293122'
              };
          } else { // for windows phone
              admobid = {
                banner: 'ca-app-pub-6699142760491850/5045443529',
                interstitial: 'ca-app-pub-6699142760491850/8733293122'
              };
          }

            // CREATE BANNER
          AdMob.createBanner( {
          adId: admobid.banner,
          position: AdMob.AD_POSITION.TOP_CENTER,
          isTesting : true,
          autoShow: true } );

          // local store
          window.isVisibleBannerView = true;
          $window.localStorage.addsInitialized = true;
        }
      }
      catch(err) {
        // Do nothing
        //console.log(err);
      }
    }

    $rootScope.getAddsInitializedStatus = function(){
      return $window.localStorage.addsInitialized || false;
    }

    $rootScope.generateCurrentDate = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd
      }
      if(mm<10){
          mm='0'+mm
      }
      var today = dd+'/'+mm+'/'+yyyy;
      return today;
    }


    $rootScope.setUpdateDate = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!

      var yyyy = today.getFullYear();
      if(dd<10){
          dd='0'+dd
      }
      if(mm<10){
          mm='0'+mm
      }
      var today = dd+'/'+mm+'/'+yyyy;
      $window.localStorage.updateDate = today;
    }


    $rootScope.getUpdateDate = function(){
      return $window.localStorage.updateDate || ': Never';
    }

    $rootScope.setContactList = function(contactsList){
      $window.localStorage.contactsList = JSON.stringify(contactsList);
    }

    $rootScope.getContactList = function(){
      return JSON.parse($window.localStorage['contactsList'] || '{}');
    }

    $rootScope.setProfileList = function(profileList){
      $window.localStorage.profileList = JSON.stringify(profileList);
    }

    $rootScope.getProfileList = function(searchTerm, category, county){
      var list = JSON.parse($window.localStorage['profileList'] || '{}');
      var filteredList = [];
      // split search term
      if(!searchTerm || searchTerm == "")
        return [];
      var searchTermsArray = searchTerm.split(" "); // splitting based on space

      for (var profIndex in list) {
        var prof = list[profIndex]; // get profile at indexOf
        var addProfile = false;
        var matchCount = 0;
        for (var stermIndex in searchTermsArray) {
          var sterm = searchTermsArray[stermIndex];
          // look for specific properties
          if (prof.hasOwnProperty('name')) {  // profile has property name
            if(prof['name'].toLowerCase().indexOf(String(sterm).toLowerCase()) > -1 ){  // contains term
              matchCount = matchCount + 1;
              addProfile = true;
            }
          }
        } // end of testing for searchTerm
        // Start testing for category
        if(prof.hasOwnProperty('category') && category.toLowerCase() != "all") {
          if(category.toLowerCase() != prof.category.toLowerCase()){
            // Set addition to false
            addProfile = false;
          }
        } // Remove addition option if categories do not match

        // Check for location option
        if(prof.hasOwnProperty('address') && county != ''){
          // county has been passed
          if(prof['address'].toLowerCase().indexOf(String(county).toLowerCase()) < 0 ){  // Not contained in address
            addProfile = false;
          }
        }
        // determine whether to add or not
        if(addProfile){
          prof.matchCount = matchCount;
          filteredList.push(prof);
        }
      }
      return filteredList;
    }

    $rootScope.setCurrentContactDetail = function(contactDetail){
      $window.localStorage.currentContactDetail = JSON.stringify(contactDetail);
    }

    $rootScope.getCurrentContactDetail = function(){
      return JSON.parse($window.localStorage['currentContactDetail'] || '{}');
    }

    $rootScope.getCurrentContactList = function(userId){
      var list  = $rootScope.getContactList();
      var currContactList = [];
      for (var contactIndex in list) {
        if (list.hasOwnProperty(contactIndex)) {
          var contact = list[contactIndex];
          if(String(contact.userId) == String(userId)){
            currContactList.push(contact);
          }
        }
      }
      return currContactList;
    }

    $rootScope.fullProfileImagePath = function(name){
      if(!name){
        //No image, use a default image
        return "./img/business_placeholder.png";
      }
      else{
        return base + "/uploads/images/profile_pics/" + name;
      }
    }

    return {
      updateDirectory : function(){
        return $http.get(base + '/api/v1/directry/list/pull-latest', {
                    method: 'GET',
                    params: {}
        });
      },
      listDirectory : function(params){
        return $http.get(base + '/api/v1/directry/list', {
                    method: 'GET',
                    params: params
        });
      },
      getAllLoadStatus : function(){
        return allLoaded;
      },
      setAllLoadStatus : function(status){
        allLoaded = status;
      },
      getAllContactProfiles : function(){
        return allContactProfiles;
      },
      setAllContactProfiles : function(list){
        allContactProfiles = list;
      },

      getEmergencyLoadStatus : function(){
        return emergencyLoaded;
      },
      setEmergencyLoadStatus : function(status){
        emergencyLoaded = status;
      },
      getEmergencyContactProfiles : function(){
        return emergencyContactProfiles;
      },
      setEmergencyContactProfiles : function(list){
        emergencyContactProfiles = list;
      },

      getOfficeLoadStatus : function(){
        return officeLoaded;
      },
      setOfficeLoadStatus : function(status){
        officeLoaded = status;
      },
      getOfficeContactProfiles : function(){
        return officeContactProfiles;
      },
      setOfficeContactProfiles : function(list){
        officeContactProfiles = list;
      },
      loadUserContacts : function(params){
        return $http.get(base + '/api/v1/directry/contact/list/', {
                    method: 'GET',
                    params: params
        });
      }
    }

  })
