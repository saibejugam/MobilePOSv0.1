/**************************************************
+	Module:		ionicApp.Invoice
+	Exports:
+		invoiceService
+		invoiceMainCtrl
**************************************************/

angular.module('ionicApp.Invoice', ['ionic','ui.router','ionic-datepicker'])

.config(function($stateProvider, $urlRouterProvider , $ionicConfigProvider, ionicDatePickerProvider){
  $ionicConfigProvider.views.maxCache(0);	

   var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);

  $stateProvider
  .state('invoice', {
		url: "/invoice",
		views: {
			'appContent' :{
				templateUrl: "templates/invoice.html",
				controller : "invoiceMainCtrl"
			}
		}
	})

	.state('invoiceDetails', {
		url: "/invoiceDetails/:invoiceno",
		views: {
			'appContent' :{
					templateUrl: "templates/invoice-details.html",
					controller: "invoiceDtlCtrl"			
				}
			}
		}
	)

	.state('invoiceDetailsByBatchNo', {
		url: "/invoiceDetails/:batchno",
		views: {
			'appContent' :{
					templateUrl: "templates/invoice-details.html",
					controller: "invoiceDtlCtrl"			
				}
			}
		}
	)
	.state('invoiceDetailsByTaxInvoiceNo', {
		url: "/invoiceDetails/:taxinvoiceno",
		views: {
			'appContent' :{
					templateUrl: "templates/invoice-details.html",
					controller: "invoiceDtlCtrl"			
				}
			}
		}
	)
})	


.factory('invoiceService', function($http) {
	return {
		searchSupplier: function(key, callback) {
			var url = "https://bouqovu4i9.execute-api.us-west-2.amazonaws.com/storemaster/supplier";
			$http.get(url+"?suppliername="+key).
			//$http.get(url).
	        success(function(data) {
	        	console.log("Supplier Results:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},

		showSupplierInvoices: function(key, callback) {
			console.log("key:" + key);
			var url = "https://qshc2lp143.execute-api.us-west-2.amazonaws.com/invoice/invoice";
			$http.get(url+"?supplierid="+key).
	        success(function(data) {
	        	console.log("Invoice Results:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},

		searchInvoiceByInvoiceNo: function(key, callback) {
			var url = "https://qshc2lp143.execute-api.us-west-2.amazonaws.com/invoice/invoice/";
			//$http.get(url+"?taxinvoiceno="+key).
			$http.get(url+key).
	        success(function(data) {
	        	console.log("Invoice details results:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},

		searchInvoiceByBatchNo: function(key, callback) {
			var url = "https://qshc2lp143.execute-api.us-west-2.amazonaws.com/invoice/invoice/";
			$http.get(url+"?batchno="+key).
	        success(function(data) {
	        	console.log("Invoice details results:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},

		searchInvoiceByTaxInvoiceNo: function(key, callback) {
			var url = "https://qshc2lp143.execute-api.us-west-2.amazonaws.com/invoice/invoice/";
			$http.get(url+"?taxinvoiceno="+key).
	        success(function(data) {
	        	console.log("Invoice details results:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},
	}
})

.controller('invoiceDtlCtrl', function($scope, $ionicModal, $state, $stateParams, invoiceService, $ionicListDelegate){
	
	if($stateParams.invoiceno){
		invoiceService.searchInvoiceByInvoiceNo($stateParams.invoiceno, function(response){
			$scope.invoiceDtl = response;
			console.log("setting scope:" + $scope.invoiceDtl.invoiceno);
		});	
	}else if($stateParams.taxinvoiceno){
		invoiceService.searchInvoiceByTaxInvoiceNo($stateParams.taxinvoiceno, function(response){
			$scope.invoiceDtl = response;
			console.log("setting scope:" + $scope.invoiceDtl.invoiceno);
		});
	}else{
		invoiceService.searchInvoiceByBatchNo($stateParams.batchno, function(response){
			$scope.invoiceDtl = response;
			$scope.batchno = $stateParams.batchno;
			console.log("setting scope:" + $scope.invoiceDtl.invoiceno);
		});	
	}		
})


.controller('invoiceMainCtrl', function($scope, $ionicModal, $state, $stateParams, invoiceService, $ionicListDelegate, ionicDatePicker, $filter){
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.selectObj = "0";
	if($stateParams.invoiceObj){
		console.log("after state.go:" + $stateParams.invoiceObj);
	}

	var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
		$scope.selectedDate = $filter('date')(val, "dd/MM/yyyy");
      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      closeOnSelect: true,       //Optional
	  dateFormat: 'dd MMMM yyyy',
      templateType: 'popup'       //Optional
    };

	$scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

	//search supplier
	$scope.lookupSupplier = function(){
		if($scope.searchSupplier){
			invoiceService.searchSupplier($scope.searchSupplier, function(response){
				$scope.suppliers = response;
			});	
		}else{
			$scope.suppliers = [];
		}
	};

	//show invoices for a given supplier
	$scope.showSupplierInvoices = function(supplier, index){
		if(supplier){
			invoiceService.showSupplierInvoices(supplier.supplierid, function(response){
				$scope.invoices = response;
				$scope.suppliers = [];
			});	
		}else{
			$scope.invoices = [];
		}
	};

	//show invoice details
	$scope.showInvoiceDetails = function(invoiceno){
		$state.go('invoiceDetails', {invoiceno:invoiceno});
	};

	//search invoice details
	$scope.searchInvoiceDetails = function(obj){
		console.log("searchkey:" + $scope.searchKey);
		if($scope.selectObj==0){
			$state.go('invoiceDetails', {invoiceno:$scope.searchKey});
		}else if($scope.selectObj == 1){
			$state.go('invoiceDetailsByBatchNo', {batchno:$scope.searchKey});
		}else{
			$state.go('invoiceDetailsByTaxInvoiceNo', {taxinvoiceno:$scope.searchKey});
		}
	};

	
});