/**************************************************
+	Module:		ionicApp.drugs
+	Exports:
+		Drugs
+		DrugInvCtrl
**************************************************/

angular.module('ionicApp.drugs', ['ionic'])

.factory('Drugs', function($http) {
	return {
		all: function(callback) {
			var url = "https://63hc0yw0n6.execute-api.us-west-2.amazonaws.com/Inventory/drugs";
			$http.get(url).
	        success(function(data) {
	        	console.log("drugs:"+JSON.stringify(data));
	        	callback(angular.fromJson(JSON.stringify(data)));
	        });
			
		},
		save: function(drugs) {
			window.localStorage['drugs'] = angular.toJson(drugs);
		},
		
		lookup:function(key, callback){
				var url = "https://63hc0yw0n6.execute-api.us-west-2.amazonaws.com/Inventory/drugs";
				$http.get(url+"?drugname="+key).
		        success(function(data) {
		        	console.log("drugs:"+JSON.stringify(data));
		        	callback(angular.fromJson(JSON.stringify(data)));
		        });
		},
		
		details: function(drugId, callback){
				var url = "https://63hc0yw0n6.execute-api.us-west-2.amazonaws.com/Inventory/drugs";
				$http.get(url+"/"+drugId).
		        success(function(data) {
		        	console.log("drug:"+JSON.stringify(data));
		        	callback(angular.fromJson(JSON.stringify(data)));
		        });
		}
	}
})


.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('drugInventory', {
		url: "/drug-inventory",
		views: {
			'appContent' :{
				templateUrl: "templates/drug-inventory.html",
				controller : "HomeCtrl"
			}
		}
	})
	
})


.controller('DrugInvCtrl', function($scope, $ionicModal, Drugs, $ionicListDelegate){
	$scope.drug = {};
	$scope.shouldShowDelete = false;
	$scope.shouldShowReorder = false;
	$scope.listCanSwipe = true;

	//Add new drug related below -------------------------------------
	
	//Modal form for add drug
	$ionicModal.fromTemplateUrl('templates/drug-add.html', function(modal) {
		$scope.addNewDrugModal = modal;
	}, {
		scope: $scope
	});


	//initialize the drugs list
	$scope.initializeDrugs = function(){
		Drugs.all(function(response){
			$scope.drugs = 	response;
		});	
	}

	$scope.clearSearch = function() {
		$scope.search = '';
	};

	//search drug
	$scope.lookupDrug = function(){
		if($scope.search){
			Drugs.lookup($scope.search, function(response){
				$scope.drugs = response;
			});	
		}else{
			$scope.drugs = [];
		}
	};
	
	
	//to open the add new drug modal form
	$scope.openAddNewDrugForm = function(){
		$scope.addNewDrugModal.show();
	}

	//to close the add new drug modal form
	$scope.closeAddNewDrugForm = function() {
		$scope.addNewDrugModal.hide();
		$scope.drug = {};
	}

	//upon submission of add new drug form, this function saves the details
	$scope.addNewDrug = function(drug) {
		console.log("add new drug..."+JSON.stringify(drug));
		var newDrug= {"name":drug.name, "type":drug.type};
		$scope.drug = {};
		$scope.drugs.push(newDrug);
		Drugs.save($scope.drugs);
		$scope.closeAddNewDrugForm();
	}

	
	//Edit inventory drug related below-------------------------

	// Create edit drug modal form
	$ionicModal.fromTemplateUrl('templates/drug-edit.html', function(modal) {
		$scope.editDrugModal = modal;
	}, {
		scope: $scope
	});

	//assign selected drug for edit and open the edit drug modal form
	$scope.openEditDrugForm = function(selectedDrug){
		$scope.drug = selectedDrug;
		$scope.editDrugModal.show();
		$ionicListDelegate.closeOptionButtons();
	}
	
	//to close the add new drug modal form
	$scope.closeEditDrugForm = function() {
		$scope.editDrugModal.hide();
		$scope.drug = {};
	}

	$scope.saveDrugEdits = function(drug){
		Drugs.save($scope.drugs);
		$scope.closeEditDrugForm();
	}

	//Show drug details related below--------------

	// Create drug details modal
	$ionicModal.fromTemplateUrl('templates/drug-details.html', function(modal) {
		$scope.drugDetailsModal = modal;
	}, {
		scope: $scope
	});

	//to show drug details modal form
	$scope.showDrugDetails = function(drug, index) {
//		$scope.drug = drug;
		$scope.drugDetailsModal.show();
		
		Drugs.details(drug.drugid, function(response){
			$scope.drug = response;
		});
	};

	//to close drug details modal form
	$scope.closeDrugDetails = function() {
		$scope.drugDetailsModal.hide();
	}

	
});