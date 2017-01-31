var fleetApp = angular.module('airApp', ['ngMaterial']);

fleetApp.controller('appCtrl', function($scope, $http) {
	$scope.editingData = {};
	
	$http.get('/fleets').then(function(response) {
		$scope.fleetDetails = response.data;
		
		for (var i = 0; i < $scope.fleetDetails.length; i++) {
			$scope.editingData[$scope.fleetDetails[i]._id] = false;
		}	
	});
	
	$scope.editAircraft = function(aircraft){
		$scope.editingData[aircraft._id] = true;
	};
	
	$scope.cancelSave = function(aircraft){
		$scope.editingData[aircraft._id] = false;
	};
	
	$scope.clearAirForm = function() {
		$scope.Name = undefined;
		$scope.Category = undefined;
		$scope.Seats = undefined;
		$scope.Hour = undefined;
		$scope.Airport = undefined;
		$scope.aircraftForm.$setPristine();;
	};
	
	$scope.clearFlightForm = function() {
		$scope.Aircraft = undefined;
		$scope.Dep_Date = undefined;
		$scope.Departure = undefined;
		$scope.Arrival = undefined;
		$scope.Price = undefined;
		$scope.flightForm.$setPristine();;
	};
	
	$scope.addAircraft = function() {
		var fleetData = {
			Name			: $scope.Name,
			Category		: $scope.Category,
			Number_of_Seats : $scope.Seats,
			Price_per_Hour	: $scope.Hour,
			Airport			: $scope.Airport
		};
		
		$http({
			method		: 'POST',
			url			: '/fleets/save',
			data    	: fleetData, //forms user object
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				
				for (var i = 0; i < $scope.fleetDetails.length; i++) {
					$scope.editingData[$scope.fleetDetails[i]._id] = false;
				}
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
	
	$scope.addFlight = function() {
		var fleetData = {
			Name	: $scope.Aircraft,
			flight	: {
				Departure_Date		: $scope.Dep_Date,
				Departure_Airport	: $scope.Departure,
				Arrival_Airport		: $scope.Arrival,
				Price				: $scope.Price
			}
		};
		
		$http({
			method		: 'POST',
			url			: '/fleets/save',
			data    	: fleetData, //forms user object
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				
				for (var i = 0; i < $scope.fleetDetails.length; i++) {
					$scope.editingData[$scope.fleetDetails[i]._id] = false;
				}
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
	
	$scope.saveAircraft = function(aircraft) {
		var fleetData = {
			Name			: aircraft.Name,
			Category		: aircraft.Category,
			Number_of_Seats : aircraft.Number_of_Seats,
			Price_per_Hour	: aircraft.Price_per_Hour,
			Airport			: aircraft.Airport
		};
		
		$http({
			method		: 'POST',
			url			: '/fleets/save',
			data    	: fleetData, //forms user object
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				$scope.editingData[aircraft._id] = false;
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
	
	$scope.saveFlight = function(aircraft) {
		var fleetData = {
			Name	: aircraft.Name,
			flight	: {
				Departure_Date		: aircraft.flight.Departure_Date,
				Departure_Airport	: aircraft.flight.Departure_Airport,
				Arrival_Airport		: aircraft.flight.Arrival_Airport,
				Price				: aircraft.flight.Price
			}
		};
		
		$http({
			method		: 'POST',
			url			: '/fleets/save',
			data    	: fleetData, //forms user object
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				$scope.editingData[aircraft._id] = false;
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
	
	$scope.removeAircraft = function(aircraft) {
		$http({
			method		: 'POST',
			url			: '/fleets/remove',
			data    	: { Name : aircraft.Name },
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				delete $scope.editingData[aircraft._id];
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
	
	$scope.removeFlight = function(aircraft) {
		$http({
			method		: 'POST',
			url			: '/fleets/delete',
			data    	: { Name : aircraft.Name },
			contentType	: "application/json; charset=utf-8"
        }).then(function(response) {
			$http.get('/fleets').then(function(response) {
				$scope.fleetDetails = response.data;
				delete $scope.editingData[aircraft._id];
			});
		}, function(response) {
			alert( "Failure message: " + JSON.stringify({response: response}));
		});
	};
});