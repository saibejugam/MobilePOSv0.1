angular.module('gandalf', ['ionic', 'ionicApp.drugs', 'ionicApp.Invoice'])

.directive('positionBarsAndContent', function($timeout) {
 return {
    restrict: 'AC',
    link: function(scope, element) {
      var offsetTop = 0;
      // Get the parent node of the ion-content
      var parent = angular.element(element[0].parentNode);
      // Get all the headers in this parent
      var headers = parent[0].getElementsByClassName('bar-subheader');
      // Iterate through all the headers
      for(var x=0;x<headers.length;x++)
      {
          // If this is not a footer bar, adjust it's position and calculate offset
          if(headers[x].className.indexOf('bar-footer') === -1) {
            // If this is not the main header or nav-bar, adjust its position to be below the previous header
            if(x > 0) {
              headers[x].style.top = (x+1) * offsetTop + 'px';
            }
            // Add up the heights of all the header bars
            offsetTop = (x+1) * offsetTop + headers[x].offsetHeight;
          }
      }      
      // Position the ion-content element directly below all the headers
      element[0].style.top = offsetTop + 'px';
    }
  };  
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('index', {
		url: "/",
		views: {
			'appContent' :{
				templateUrl: "templates/home.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('sales', {
		url: "/sales",
		views: {
			'appContent' :{
				templateUrl: "templates/sales.html",
				controller : "HomeCtrl"
			}
		}
	})
	
	.state('masterData', {
		url: "/master-data",
		views: {
			'appContent' :{
				templateUrl: "templates/master-data.html",
				controller : "DrugInvCtrl"
			}
		}
	})
	.state('analytics', {
		url: "/analytics",
		views: {
			'appContent' :{
				templateUrl: "templates/analytics.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('notifications', {
		url: "/notifications",
		views: {
			'appContent' :{
				templateUrl: "templates/notifications.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('crm', {
		url: "/crm",
		views: {
			'appContent' :{
				templateUrl: "templates/crm.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('tools', {
		url: "/tools",
		views: {
			'appContent' :{
				templateUrl: "templates/tools.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('bookOfBusiness', {
		url: "/bob",
		views: {
			'appContent' :{
				templateUrl: "templates/bob.html",
				controller : "HomeCtrl"
			}
		}
	})
	.state('myAccount', {
		url: "/account",
		views: {
			'appContent' :{
				templateUrl: "templates/account.html",
				controller : "HomeCtrl"
			}
		}
	})

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise("/");

})

.controller('HomeCtrl', function($scope, $state, $ionicSideMenuDelegate) {

	// Called to navigate
	$scope.navigateTo = function(nav, index) {
		$scope.activeView = nav.label;
		$ionicSideMenuDelegate.toggleLeft(false);
		$state.go(nav.state);
	};

	$scope.toggleNav = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	//Default view/landing view
	$scope.activeView = "Dashboard";
	$scope.navItems = gandalf.navigation;
});