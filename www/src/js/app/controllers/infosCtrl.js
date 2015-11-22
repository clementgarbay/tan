app.controller('InfosCtrl', ['$scope', '$log', 'TanFactory', function ($scope, $log, TanFactory) {

	$scope.startLoading();

	// Si le navigateur est connecté à internet
	if ($scope.onLine()) {
		// Récupération des infos trafic via l'API
		TanFactory.getInfoTrafic().then(function (infos) {
			$scope.infos = infos;
			localStorage.setItem('infoTrafic', JSON.stringify($scope.infos));

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
