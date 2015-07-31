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
      }, 2222);
    };


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

    $rootScope.getProfileList = function(searchTerm, category){
      var list = JSON.parse($window.localStorage['profileList'] || '{}');
      var filteredList = [];
      // split search term
      if(!searchTerm || searchTerm == "")
        return list;
      var searchTermsArray = searchTerm.split(" "); // splitting based on space

      for (var profIndex in list) {
        var prof = list[profIndex];
        var added = false;
        for (var stermIndex in searchTermsArray) {
          var sterm = searchTermsArray[stermIndex];
          // look for specific properties
          if (prof.hasOwnProperty('name')) {
            if(prof['name'].toLowerCase().indexOf(String(sterm).toLowerCase()) > -1 && !added){
              if(category){
                if(prof.hasOwnProperty('category')){
                  if(category.toLowerCase() == prof.category.toLowerCase()){
                    filteredList.push(prof);
                    added = true;
                  }
                }
              }
              else{
                filteredList.push(prof);
                added = true;
              }
            }
          }
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
