app.controller('OfflineCtrl', ['$scope', function ($scope) {
	
	$scope.savedStations = JSON.parse(localStorage.getItem('stations'));	

}]);
