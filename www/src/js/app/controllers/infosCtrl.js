app.controller('InfosCtrl', ['$scope', 'TanFactory', function ($scope, TanFactory) {
	
	$scope.startLoading();

	// Si le navigateur est connecté à internet
	if ($scope.onLine()) {
		// Récupération des infos trafic via l'API
		TanFactory.getInfoTrafic().then(function (data) {
			$scope.infos = data;
			localStorage.setItem('infoTrafic', JSON.stringify(data));
			
			$scope.stopLoading();
		}, function (error) {
			$scope.error(error);
		});
	} else {
		// Utilisation des infos trafic sauvegardées
		$scope.infos = JSON.parse(localStorage.getItem('infoTrafic'));
		$scope.stopLoading();
	}

}]);
