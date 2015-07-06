angular.module('directory.services',[])
  .factory('API', function($rootScope, $http, $ionicLoading, $window){
    var base = "http://directry-serv.azurewebsites.net";

    $rootScope.show = function(text){
      $rootScope.loading = $ionicLoading.show({
        content: text ? text : 'Loading',
        animation : 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay:0
      })
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
          return "./img/business_placeholder.jpg";
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
      loadUserContacts : function(params){
        return $http.get(base + '/api/v1/directry/contact/list/', {
                    method: 'GET',
                    params: params
        });
      }
    }

  })
