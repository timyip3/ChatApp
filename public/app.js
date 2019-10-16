var messageApp = angular.module('messageApp', []);

messageApp.controller('messageController', function messageController($scope, $http) {
	$scope.Message = {};
	function loadData() {
		var url = '/messages';
		$http.get(url).then(function (response) {
			console.log(response);
			$scope.messages = response.data;
		});
	}
	
	loadData();
	$scope.submit = function() {
		$http.post('/messages', $scope.Message)
			.then(function (data) {
				loadData();
			})		
	}
});
