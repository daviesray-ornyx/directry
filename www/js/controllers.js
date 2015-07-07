angular.module('directory.controllers', ['directory.services'])

.controller('DirectoryAllCtrl', function($rootScope, $scope, $ionicHistory, API, $window){
  $scope.limit = 25;
  $scope.stillMoreContacts = true;
  $scope.loadButtonText = "Load more";
  // Bootstraping app
  $scope.searchTerm = "";   // this is the search term
  $scope.directory = API.getAllContactProfiles();
  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.load = function(){
    $rootScope.show("Loading...")
    API.listDirectory({
      name : "",
      category: "",
      skip: 0,
      limit: $scope.limit
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.setLoadButtonText();
        $scope.directory = list;
        API.setAllContactProfiles(list); // set services value
        API.setAllLoadStatus(true);
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.setLoadButtonText = function(){
    $scope.loadButtonText = $scope.stillMoreContacts ? "Load More" : "No more contacts";
  }

  $scope.loadMore = function(){
    // get current count
    $rootScope.show("Loading...")
    var count = this.directory.length;
    var limit = this.limit;
    API.listDirectory({
      name : this.searchTerm,
      skip: count,
      limit: limit
    })
    .success(function(list){
      $scope.stillMoreContacts = list.length == 0 ? false : true;
      $scope.directory = $scope.directory.concat(list);
      API.setAllContactProfiles($scope.directory); // set services value
      $scope.setLoadButtonText();
      API.setAllLoadStatus(true);
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.search = function(){
    $rootScope.show("Loading...");
    API.listDirectory({
      name : this.searchTerm,
      skip: 0,
      limit: this.limit
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.directory = list;
        API.setAllContactProfiles(list); // set services value
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.clearSearch = function(){
    this.searchTerm = "";
    $scope.load();
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/all/contact._id");
  }

  if(!API.getAllLoadStatus() || $scope.directory.length == 0){  // checks if status has been loaded before
    // initial load... No history... Do first load
    $scope.load();
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
  $scope.limit = 25;
  $scope.stillMoreContacts = true;
  $scope.loadButtonText = "Load more";

  $scope.searchTerm = "";   // this is the search term
  $scope.directory = API.getEmergencyContactProfiles();

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.load = function(){
    $rootScope.show("Loading...");
    API.listDirectory({
      name : $scope.searchTerm,
      category:"emergency",
      skip: 0,
      limit: 25
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.directory = list;
        API.setEmergencyContactProfiles(list); // set services value
        API.setEmergencyLoadStatus(true);
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.setLoadButtonText = function(){
    $scope.loadButtonText = $scope.stillMoreContacts ? "Load More" : "No more contacts";
  }

  $scope.loadMore = function(){
    // get current count
    $rootScope.show("Loading...");
    var count = this.directory.length;
    var limit = this.limit;
    API.listDirectory({
      name : this.searchTerm,
      category: "emergency",
      skip: count,
      limit: limit
    })
    .success(function(list){
      $scope.stillMoreContacts = list.length == 0 ? false : true;
      $scope.directory = $scope.directory.concat(list);
      API.setEmergencyContactProfiles($scope.directory); // set services value
      $scope.setLoadButtonText();
      API.setEmergencyLoadStatus(true);
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.search = function(){
    $rootScope.show("Loading...");
    API.listDirectory({
      name : this.searchTerm,
      skip: 0,
      limit: this.limit
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.directory = list;
        API.setEmergencyContactProfiles(list); // set services value
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.clearSearch = function(){
    this.searchTerm = "";
    $scope.load();
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/emergency/contact._id");
  }

  if(!API.getAllLoadStatus() || $scope.directory.length == 0){  // checks if status has been loaded before
    // initial load... No history... Do first load
    $scope.load();
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
  $scope.limit = 25;
  $scope.stillMoreContacts = true;
  $scope.loadButtonText = "Load more";

  $scope.searchTerm = "";   // this is the search term
  $scope.directory = API.getOfficeContactProfiles();

  if($ionicHistory.backView()){ // Not initial load..
    $ionicHistory.clearHistory(); // Clear history  // rest of things remain same for now
  }

  $scope.load = function(){
    $rootScope.show("Loading...");
    API.listDirectory({
      name : "",
      category:"office",
      skip: 0,
      limit: 25
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.directory = list;
        API.setOfficeContactProfiles(list); // set services value
        API.setOfficeLoadStatus(true);
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.setLoadButtonText = function(){
    $scope.loadButtonText = $scope.stillMoreContacts ? "Load More" : "No more contacts";
  }

  $scope.loadMore = function(){
    // get current count
    $rootScope.show("Loading...");
    var count = this.directory.length;
    var limit = this.limit;
    API.listDirectory({
      name : this.searchTerm,
      category: "office",
      skip: count,
      limit: limit
    })
    .success(function(list){
      $scope.stillMoreContacts = list.length == 0 ? false : true;
      $scope.directory = $scope.directory.concat(list);
      API.setOfficeContactProfiles($scope.directory); // set services value
      $scope.setLoadButtonText();
      API.setOfficeLoadStatus(true);
      $rootScope.hide();
    })
    .error(function(err){
      console.log(err);
      $rootScope.hide();
    })
  }

  $scope.search = function(){
    $rootScope.show("Loading...");
    API.listDirectory({
      name : this.searchTerm,
      skip: 0,
      limit: this.limit
      })
      .success(function(list){
        $scope.stillMoreContacts = list.length == 0 ? false : true;
        $scope.directory = list;
        API.setOfficeContactProfiles(list); // set services value
        $rootScope.hide();
      })
      .error(function(err){
        console.log(err);
        $rootScope.hide();
      })
  }

  $scope.clearSearch = function(){
    this.searchTerm = "";
    $scope.load();
  }

  $scope.fullProfileImagePath = function(name){
    return $rootScope.fullProfileImagePath(name);
  }

  $scope.showDetail = function(contact){
    // set current contact detail in rootScope
    $rootScope.setCurrentContactDetail(contact);
    $window.location.href = ("#/tab/offices/contact._id");
  }

  if(!API.getAllLoadStatus() || $scope.directory.length == 0){  // checks if status has been loaded before
    // initial load... No history... Do first load
    $scope.load();
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
