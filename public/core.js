var bids = angular.module('bidding', []);

function bidsController($scope, $http) {
	$scope.formData = {};
	
	// when landing on the page, get all bids and show them
	$http.get('/api/bids')
		.success(function (data) {
			$scope.bids = data;
			console.log(data);
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});

	$scope.addBid = function () {
		$http.post('/api/bids', $scope.formData)
			.success(function (data) {
				$scope.formData = {}; // clear the form so the use can add another bid
				$scope.bids = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};
	
	$scope.removeBid = function(id) {
		$http.delete('api/bids/' + id)
			.success(function (data) {
				$scope.bids = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};
}

function loginController($scope, $http) {
	$scope.formData = {};
	
	// when landing on the page, get all bids and show them
	$http.get('/api/bids')
		.success(function (data) {
			$scope.bids = data;
			console.log(data);
		})
		.error(function (data) {
			console.log('Error: ' + data);
		});

	$scope.addBid = function () {
		$http.post('/api/bids', $scope.formData)
			.success(function (data) {
				$scope.formData = {}; // clear the form so the use can add another bid
				$scope.bids = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};
	
	$scope.removeBid = function(id) {
		$http.delete('api/bids/' + id)
			.success(function (data) {
				$scope.bids = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error' + data);
			});
	};
}