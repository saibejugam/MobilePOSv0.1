angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.myAccount', {
    url: '/pgMyAccount',
    views: {
      'tab1': {
        templateUrl: 'templates/myAccount.html',
        controller: 'myAccountCtrl'
      }
    }
  })

  .state('tabsController.drugDictionary', {
    url: '/pgDictionary',
    views: {
      'tab2': {
        templateUrl: 'templates/drugDictionary.html',
        controller: 'drugDictionaryCtrl'
      }
    }
  })

  .state('tabsController.reports', {
    url: '/pgReports',
    views: {
      'tab5': {
        templateUrl: 'templates/reports.html',
        controller: 'reportsCtrl'
      }
    }
  })

  .state('tabsController.sales', {
    url: '/pgSales',
    views: {
      'tab4': {
        templateUrl: 'templates/sales.html',
        controller: 'salesCtrl'
      }
    }
  })

  .state('tabsController.invoices', {
    url: '/pgInvoices',
    views: {
      'tab3': {
        templateUrl: 'templates/invoices.html',
        controller: 'invoicesCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

$urlRouterProvider.otherwise('/page1/pgMyAccount')

  

});