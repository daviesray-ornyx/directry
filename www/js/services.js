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

    $rootScope.setCurrentContactDetail = function(contactDetail){
      $window.localStorage.currentContactDetail = JSON.stringify(contactDetail);
    }

    $rootScope.getCurrentContactDetail = function(){
      return JSON.parse($window.localStorage['currentContactDetail'] || '{}');
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
