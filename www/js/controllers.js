angular.module('directory.controllers', ['directory.services'])
.controller('DirectoryCtrl', function($rootScope, $scope, $ionicHistory, API, $window){

  $scope.searchTerm = {};   // this is the search term
  $scope.directory = [];
  $scope.resultsMessage = "Enter Name and County then press search...";

  $scope.showSearchPrompt = function(){
    return $scope.directory.length > 0 ? false : true;
  }

  $scope.updateDate = $rootScope.getUpdateDate();

  $scope.searchAll = function(){
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();
    // get search term
    if(!$scope.searchTerm.text || $scope.searchTerm.text == '')
    {
      $rootScope.notify("Please enter name to search!");
    }
    else{
      $rootScope.show("Loading...");
      $scope.directory = $rootScope.getProfileList($scope.searchTerm.text, "All", $scope.searchTerm.county || '');
      $scope.resultsMessage = $scope.directory.length + " results for " + $scope.searchTerm.text + " in "  + ($scope.searchTerm.county ? $scope.searchTerm.county + " county" : " all counties") ;
      $rootScope.hide();
    }
  }

  $scope.updateDirectory = function(){
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();
    // check if update is necessary
    if($scope.updateDate == $rootScope.generateCurrentDate()){
      // Directry up to date
      $rootScope.notify("Directory is up to date");
    }
    else{
      // Rootscope not up to date... Sync
      $rootScope.show("Synchronizing Directory....")
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
        $rootScope.hide();
      })
    }
  }

  $scope.resetSearch = function(){  // Resets everything
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();
    $scope.directory = [];
    $scope.searchTerm.text = "";
    $scope.searchTerm.location = "";
    $scope.resultsMessage = "Enter Name and County then press search..."
  }

  $scope.resetLocation = function(){  // resets location only and refines the search
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();

    $scope.directory = [];
    $scope.searchTerm.county = "";

    // Check if name is populated
    if(!$scope.searchTerm.text || $scope.searchTerm.text == '')
      return;
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

  if($scope.updateDate == ': Never'){
    $scope.updateDirectory(); // Update directory if never updated... Else user has option to sync or not
  }
  // Initialize add
  if(!window.isVisibleBannerView)
    $rootScope.initializeAdd();
})
.controller('DirectoryDetailCtrl', function($rootScope, $ionicHistory, $scope, API, $window){
    // Initialize add
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();

  $rootScope.show("Loading contacts");
  $scope.contact = $rootScope.getCurrentContactDetail();
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  $scope.contactDetails = $rootScope.getCurrentContactList($scope.contact.userId);
  $scope.contactCount = $scope.contactDetails.length;
  $rootScope.hide();

  $scope.goBack = function(){
    if(!window.isVisibleBannerView)
      $rootScope.initializeAdd();

    if($ionicHistory.backView()){ // Not initial load..
      $ionicHistory.goBack(-1);
    }
  }
})
