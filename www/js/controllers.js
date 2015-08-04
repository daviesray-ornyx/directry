angular.module('directory.controllers', ['directory.services'])
.controller('DirectoryCtrl', function($rootScope, $scope, $ionicHistory, API, $window){

// Ads
  if(!window.isVisibleBannerView)
    $rootScope.initializeAdd();
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
    //$rootScope.notify("You have not synced your directory. Pull content to sync..");
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

  $scope.resetSearch = function(){  // Resets everything
    $scope.directory = [];
    $scope.searchTerm.text = "";
    $scope.searchTerm.location = "";
  }

  $scope.resetLocation = function(){  // resets location only and refines the search
    $scope.directory = [];
    $scope.searchTerm.county = "";

    $scope.searchAll();

  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/directory/detail");
  }

})
.controller('DirectoryDetailCtrl', function($rootScope, $ionicHistory, $scope, API, $window){
  // Ads
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();

  $rootScope.show("Loading contacts");
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  $scope.contactDetails = $rootScope.getCurrentContactList($scope.contact.userId);
  $scope.contactCount = $scope.contactDetails.length;
  $rootScope.hide();

  $scope.goBack = function(){
    if($ionicHistory.backView()){ // Not initial load..
      $ionicHistory.goBack(-1);
    }
  }
})
