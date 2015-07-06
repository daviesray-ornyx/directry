angular.module('directory.controllers', ['directory.services'])

.controller('DirectoryAllCtrl', function($rootScope, $scope, API, $window){
  // do initial loading
    // loads of 25
  $scope.name = "";
  $scope.directory = [];
  API.listDirectory({
    name : $scope.name,
    skip: 0,
    limit: 40
    })
    .success(function(list){
      $scope.directory = list;
    })
    .error(function(err){
      console.log(err);
    })
  $scope.loadMore = function(){
    // get current count
    var count = $scope.directry.length;
    var limit = 40;
    API.listDirectory({
      name : $scope.name,
      skip: count,
      limit: limit
    })
    .success(function(list){
      console.log(list);
      $scope.directory = hege.concat(list);
    })
    .error(function(err){
      console.log(err);
    })
  }

  $scope.search = function(){
    API.listDirectory({
      name : $scope.name,
      skip: 0,
      limit: 40
      })
      .success(function(list){
        console.log("all list");
        console.log(list);
        $scope.directory = list;
      })
      .error(function(err){
        console.log(err);
      })
  }

  $scope.clearSearch = function(){
    $scope.name = "";
    $scope.search();
  }

  $scope.fullProfileImagePath = $rootScope.fullProfileImagePath(name){;

  $scope.showDetail = function(contact){
    console.log(contact);
    // set current contact detail in rootScopr
    var c = contact;
    $rootScope.setCurrentContactDetail(c);
    $window.location.href = ("#/tab/all/contact._id");
  }

})
.controller('DirectoryAllDetailCtrl', function($rootScope, $scope, API, $window){
  $scope.contact = $rootScope.getCurrentContactDetail();

  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  console.log($scope.picUrl)
      // Load contacts
  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      console.log(list);
      $scope.contactDetails = list;
        $scope.contactCount =  list.length;
    })
    .error(function(err){
      console.log(err);
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
.controller('DirectoryEmergencyCtrl', function($rootScope, $scope, API, $window){
  // do initial loading
    // loads of 25
  $scope.name = "";
  $scope.directory = [];

  API.listDirectory({
    name : $scope.name,
    category:"emergency",
    skip: 0,
    limit: 25
    })
    .success(function(list){
      console.log(list);
      $scope.directory = list;
    })
    .error(function(err){
      console.log(err);
    })
  $scope.loadMore = function(){
    // get current count
    var count = $scope.directry.length;
    var limit = 25;
    API.listDirectory({
      name : $scope.name,
      category:"emergency",
      skip: count,
      limit: limit
    })
    .success(function(list){
      console.log(list);
      $scope.directory = hege.concat(list);
    })
    .error(function(err){
      console.log(err);
    })
  }

  $scope.search = function(){
    API.listDirectory({
      name : $scope.name,
      skip: 0,
      limit: 40
      })
      .success(function(list){
        console.log("all list");
        console.log(list);
        $scope.directory = list;
      })
      .error(function(err){
        console.log(err);
      })
  }

  $scope.clearSearch = function(){
    $scope.name = "";
    $scope.search();
  }

  $scope.fullProfileImagePath = $rootScope.fullProfileImagePath(name);

  $scope.showDetail = function(contact){
    console.log(contact);
    // set current contact detail in rootScopr
    var c = contact;
    $rootScope.setCurrentContactDetail(c);
    $window.location.href = ("#/tab/emergency/contact._id");
  }

})
.controller('DirectoryEmergencyDetailCtrl', function($rootScope, $scope, API, $window){
  $scope.contact = $rootScope.getCurrentContactDetail();

  // Load contacts
  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  console.log($scope.picUrl)    ;

  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      console.log(list);
      $scope.contactDetails = list;
      $scope.contactCount =  list.length;
    })
    .error(function(err){
      console.log(err);
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
.controller('DirectoryOfficesCtrl', function($rootScope, $scope, API, $window){
  // do initial loading
    // loads of 25
  $scope.name = "";
  $scope.directory = [];
  API.listDirectory({
    name : $scope.name,
    category:"office",
    skip: 0,
    limit: 25
    })
    .success(function(list){
      console.log(list);
      $scope.directory = list;
    })
    .error(function(err){
      console.log(err);
    })
  $scope.loadMore = function(){
    // get current count
    var count = $scope.directry.length;
    var limit = 25;
    API.listDirectory({
      name : $scope.name,
      category:"office",
      skip: count,
      limit: limit
    })
    .success(function(list){
      console.log(list);
      $scope.directory = hege.concat(list);
    })
    .error(function(err){
      console.log(err);
    })
  }

  $scope.search = function(){
    API.listDirectory({
      name : $scope.name,
      skip: 0,
      limit: 40
      })
      .success(function(list){
        console.log("all list");
        console.log(list);
        $scope.directory = list;
      })
      .error(function(err){
        console.log(err);
      })
  }

  $scope.clearSearch = function(){
    $scope.name = "";
    $scope.search();
  }

  $scope.fullProfileImagePath = function(name){
    if(!name){
      //No image, use a default image
      return "./img/business_placeholder.jpg";
    }
    else{
      return "http://localhost:9804/uploads/images/profile_pics/" + name;
    }
  }

  $scope.showDetail = $rootScope.fullProfileImagePath(contact);
})
.controller('DirectoryOfficesDetailCtrl', function($rootScope, $scope, API, $window){
  $scope.contact = $rootScope.getCurrentContactDetail();

  $scope.picUrl = $rootScope.fullProfileImagePath($scope.contact.pic);
  console.log($scope.picUrl)
      // Load contacts
  $scope.contactDetails = [];
  $scope.contactCount = 0;
  API.loadUserContacts({id:$scope.contact.userId}).
    success(function(list){
      console.log(list);
      $scope.contactDetails = list;
      $scope.contactCount =  list.length;
    })
    .error(function(err){
      console.log(err);
    })

  $scope.triggerAction = function(detail){
    // triggers contact operation.. e.g Initiate a phone call

  }
})
