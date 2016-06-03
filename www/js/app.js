// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//angular.module('app', ['ionic'])

 angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.controller('menuCtrl', ['$scope', '$ionicModal', '$ionicSideMenuDelegate', function($scope, $ionicModal, $ionicSideMenuDelegate) {

    $scope.hideSidemenuBackButton = true;
    var topLevelCategories;
    
    topLevelCategories = $scope.categories = [
      {id: 10, name: 'Sales', taxons: [
        {id: 50, name: 'Counter Sales', taxons: [], is_first_level: false},
        {id: 60, name: 'Billing', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 20, name: 'Invoice', taxons: [
        {id: 70, name: 'Search', taxons: [], is_first_level: false},
        {id: 80, name: 'Add New Invoice', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 30, name: 'Inventory', taxons: [
        {id: 90, name: 'Add New Drug', taxons: [], is_first_level: false},
        {id: 100, name: 'Search Alternate Drug', taxons: [], is_first_level: false},
        {id: 110, name: 'Stock Management', taxons: [], is_first_level: false}
      ], is_first_level: true},
      {id: 40, name: 'Master Data Setup', taxons: [
        {id: 120, name: 'Wholesaler', taxons: [], is_first_level: false},
        {id: 130, name: 'Doctor', taxons: [], is_first_level: false},
        {id: 140, name: 'Manufacturer', taxons: [], is_first_level: false},
        {id: 150, name: 'Pack', taxons: [], is_first_level: false},
        {id: 160, name: 'Drug Type', taxons: [], is_first_level: false},
        {id: 170, name: 'Rack Setup', taxons: [], is_first_level: false}
      ], is_first_level: true}
    ];
  
    var getByParentId = function(id) {
      for (var i in topLevelCategories) {
        if (topLevelCategories[i].id == id) {
          return topLevelCategories[i].taxons;
        }
      }
    }
        
    $scope.toggleCategories = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.showSubcategories = function(category) {
        $scope.categories = getByParentId(category.id);
        $scope.hideSidemenuBackButton = false;
    };

    $scope.showTopLevelCategories = function () {
        $scope.categories = topLevelCategories;
        $scope.hideSidemenuBackButton = true;
    };
}])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})