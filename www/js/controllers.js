angular.module('directory.controllers', ['directory.services'])

.controller('DirectoryAllCtrl', function($rootScope, $scope, $ionicHistory, API, $window){

  // Bootstraping app
  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  $scope.updateDate = $rootScope.getUpdateDate();


  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.searchAll = function(){
    // get search term
    $rootScope.show("Loading...");
    $scope.directory = $rootScope.getProfileList($scope.searchTerm.text);
    $rootScope.hide();
  }

  $scope.updateDirectory = function(){
    $rootScope.show("Updating Directory from Server...")
    API.updateDirectory({})
    .success(function(dirObject){
      $rootScope.setProfileList(dirObject.profileList);
      $rootScope.setContactList(dirObject.contactsList);
      // Set last updated
      $rootScope.setUpdateDate ();
      $scope.updateDate = $rootScope.getUpdateDate();
      // Hide loading indicator
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.resetSearchAll = function(sTerm){
    $scope.directory = [];
    $scope.searchTerm.text = "";
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/all/contact._id");
  }

})
.controller('DirectoryAllDetailCtrl', function($rootScope, $scope, API, $window){
  $rootScope.show("Loading contacts")
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
      // Load contacts
  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      console.log(list);
      $scope.contactDetails = list;
      $scope.contactCount =  list.length;
      $rootScope.hide()  ;
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide()  ;
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
.controller('DirectoryEmergencyCtrl', function($rootScope, $scope, $ionicHistory, API, $window){
  // Bootstraping app
  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];

  $scope.updateDate = $rootScope.getUpdateDate();

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.searchAll = function(){
    // get search term
    $rootScope.show("Loading...");
    $scope.directory = $rootScope.getProfileList($scope.searchTerm.text);
    $rootScope.hide();
  }

  $scope.updateDirectory = function(){
    $rootScope.show("Updating Directory from Server...")
    API.updateDirectory({})
    .success(function(dirObject){
      $rootScope.setProfileList(dirObject.profileList);
      $rootScope.setContactList(dirObject.contactsList);
      // Set last updated
      $rootScope.setUpdateDate ();
      $scope.updateDate = $rootScope.getUpdateDate();
      // Hide loading indicator
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.resetSearchAll = function(sTerm){
    $scope.directory = [];
    $scope.searchTerm.text = "";
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/all/contact._id");
  }

})
.controller('DirectoryEmergencyDetailCtrl', function($rootScope, $scope, API, $window){
  $scope.contact = $rootScope.getCurrentContactDetail();

  // Load contacts
  $rootScope.show("Loading...");
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  console.log($scope.picUrl)    ;

  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      console.log(list);
      $scope.contactDetails = list;
      $scope.contactCount =  list.length;
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
.controller('DirectoryOfficesCtrl', function($rootScope, $scope, $ionicHistory, API, $window){
  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.updateDate = $rootScope.getUpdateDate();

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }
  
  $scope.searchAll = function(){
    // get search term
    $rootScope.show("Loading...");
    $scope.directory = $rootScope.getProfileList($scope.searchTerm.text);
    $rootScope.hide();
  }

  $scope.updateDirectory = function(){
    $rootScope.show("Updating Directory from Server...")
    API.updateDirectory({})
    .success(function(dirObject){
      $rootScope.setProfileList(dirObject.profileList);
      $rootScope.setContactList(dirObject.contactsList);
      // Set last updated
      $rootScope.setUpdateDate ();
      $scope.updateDate = $rootScope.getUpdateDate();
      // Hide loading indicator
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.resetSearchAll = function(sTerm){
    $scope.directory = [];
    $scope.searchTerm.text = "";
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/all/contact._id");
  }

})
.controller('DirectoryOfficesDetailCtrl', function($rootScope, $scope, API, $window){
  $scope.contact = $rootScope.getCurrentContactDetail();

  $rootScope.show("Loading...");
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
      // Load contacts
  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      $scope.contactDetails = list;
      $scope.contactCount =  list.length;
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
