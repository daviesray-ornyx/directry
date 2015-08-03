angular.module('directory.controllers', ['directory.services'])
.controller('DirectoryAllCtrl', function($rootScope, $scope, $ionicHistory, API, $window){

  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.noContactMessage = ""

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  $scope.updateDate = $rootScope.getUpdateDate();

  // check for update date... if equals never, display modal to pull latest content
  if($scope.updateDate == ': Never'){
    // propmt for update
    $rootScope.notify("You have not synced your directory. Pull content to sync..");
  }

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.searchAll = function(){
    // get search term
    if(!$scope.searchTerm.text || $scope.searchTerm.text == '')
    {
      $rootScope.notify("Please enter name to search!");
    }
    else{
      $rootScope.show("Loading...");
      $scope.directory = $rootScope.getProfileList($scope.searchTerm.text, "All", $scope.searchTerm.county || '');
      $scope.noContactMessage = $scope.directory.length < 1 ? "Zero Contacts found... Refine your search." : "";
      $rootScope.hide();
    }
  }

  $scope.updateDirectory = function(){
    // check if update is necessary
    if($scope.updateDate == $rootScope.generateCurrentDate()){
      // Directry up to date
      $rootScope.notify("Directory is up to date");
    }
    else{
      // Rootscope not up to date... Sync
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
  $rootScope.show("Loading contacts");
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  $scope.contactDetails = $rootScope.getCurrentContactList($scope.contact.userId);
  $scope.contactCount = $scope.contactDetails.length;
  $rootScope.hide();
})
.controller('DirectoryEmergencyCtrl', function($rootScope, $scope, $ionicHistory, API, $window){
  // Bootstraping app
  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.noContactMessage = ""

  $scope.updateDate = $rootScope.getUpdateDate();

  // check for update date... if equals never, display modal to pull latest content
  if($scope.updateDate == ': Never'){
    // propmt for update
    $rootScope.notify("You have not synced your directory. Pull content to sync..");
  }

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.searchAll = function(){
    // get search term
    if(!$scope.searchTerm.text || $scope.searchTerm.text == '')
    {
      $rootScope.notify("Please enter name to search!");
    }
    else{
      $rootScope.show("Loading...");
      $scope.directory = $rootScope.getProfileList($scope.searchTerm.text, "Emergency", $scope.searchTerm.county || '');
      $scope.noContactMessage = $scope.directory.length < 1 ? "Zero Contacts found... Refine your search." : "";
      $rootScope.hide();
    }
  }

  $scope.updateDirectory = function(){
    // check if update is necessary
    if($scope.updateDate == $rootScope.generateCurrentDate()){
      // Directry up to date
      $rootScope.notify("Directory is up to date");
    }
    else{
      // Rootscope not up to date... Sync
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
    $window.location.href = ("#/tab/emergency/contact._id");
  }

})
.controller('DirectoryEmergencyDetailCtrl', function($rootScope, $scope, API, $window){
  $rootScope.show("Loading contacts");
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  $scope.contactDetails = $rootScope.getCurrentContactList($scope.contact.userId);
  $scope.contactCount = $scope.contactDetails.length;
  $rootScope.hide();
})
.controller('DirectoryOfficesCtrl', function($rootScope, $scope, $ionicHistory, API, $window){
  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.noContactMessage = ""
  $scope.updateDate = $rootScope.getUpdateDate();

  // check for update date... if equals never, display modal to pull latest content
  if($scope.updateDate == ': Never'){
    // propmt for update
    $rootScope.notify("You have not synced your directory. Pull content to sync..");
  }

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  $scope.searchAll = function(){
    if(!$scope.searchTerm.text || $scope.searchTerm.text == '')
    {
      $rootScope.notify("Please enter name to search!");
    }
    else{
      $rootScope.show("Loading...");
      $scope.directory = $rootScope.getProfileList($scope.searchTerm.text, "Office", $scope.searchTerm.county || '');
      $scope.noContactMessage = $scope.directory.length < 1 ? "Zero Contacts found... Refine your search." : "";
      $rootScope.hide();
    }
  }

  $scope.updateDirectory = function(){
    // check if update is necessary
    if($scope.updateDate == $rootScope.generateCurrentDate()){
      // Directry up to date
      $rootScope.notify("Directory is up to date");
    }
    else{
      // Rootscope not up to date... Sync
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
    $window.location.href = ("#/tab/offices/contact._id");
  }

})
.controller('DirectoryOfficesDetailCtrl', function($rootScope, $scope, API, $window){
  $rootScope.show("Loading contacts");
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  $scope.contactDetails = $rootScope.getCurrentContactList($scope.contact.userId);
  $scope.contactCount = $scope.contactDetails.length;
  $rootScope.hide();
})
