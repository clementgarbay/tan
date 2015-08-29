app.controller('TimetablesCtrl', ['$scope', '$route', '$routeParams', '$location', '$timeout', 'TanFactory', function ($scope, $route, $routeParams, $location, $timeout, TanFactory) {

	$scope.params = {};
	$scope.params.stationCode = $routeParams.stationCode;
	$scope.params.stationName = $routeParams.stationName;
	$scope.params.numLine = $routeParams.numLine;
	$scope.params.direction = $routeParams.direction;

	if ($scope.params.stationCode === undefined) {
		$scope.startLoading();
		TanFactory.getStations().then(function (stations) {
			$scope.stations = stations;
			$scope.stopLoading();
		}, function (error) {
			$scope.error(error);
		});
	}

	// Si une station est sélectionnée mais pas une ligne en particulier, alors on affiche les temps d'attente des lignes de la station
	if ($scope.params.stationCode !== undefined && $scope.params.numLine === undefined) {
		$scope.startLoading();

		$scope.station = {};

		TanFactory.getStationWaitingTime($scope.params.stationCode).then(function (data) {

			// Réorganisation des données reçu
			var station = {};
			angular.forEach(data, function (item, key) {
				// Si la ligne n'existe pas dans la collection, on l'initialise
				if (station[item.ligne.numLigne] === undefined) {
					station[item.ligne.numLigne] = {};
					station[item.ligne.numLigne].num = item.ligne.numLigne;
					station[item.ligne.numLigne].type = item.ligne.typeLigne;
					station[item.ligne.numLigne].trafficInfo = item.infotrafic;
					station[item.ligne.numLigne].directions = {};
				}
				// Si la direction n'existe pas dans la collection de la ligne correspondante, on l'initialise
				if (station[item.ligne.numLigne].directions[item.sens] === undefined) {
					station[item.ligne.numLigne].directions[item.sens] = {};
					station[item.ligne.numLigne].directions[item.sens].terminus = item.terminus;
					station[item.ligne.numLigne].directions[item.sens].waitingTimes = [];
				}
				// Si l'horaire n'est pas déjà présent pour la direction et la ligne correspondante, on l'ajoute
				if (station[item.ligne.numLigne].directions[item.sens].waitingTimes.indexOf(item.temps) === -1) {
					station[item.ligne.numLigne].directions[item.sens].waitingTimes.push(item.temps);
				}
			});

			$scope.station.data = station;

			$scope.stopLoading();
		}, function (error) {
			$scope.error(error);
		});

	// Si une station est sélectionnée ainsi qu'une ligne en particulier, alors afficher les horaires de cette ligne à cette station
	} else if ($scope.params.stationCode !== undefined && $scope.params.numLine !== undefined && $scope.params.direction !== undefined) {
		$scope.startLoading();

		// Récupération des grilles horaires enregistrées
		var savedStations = JSON.parse(localStorage.getItem('stations')) || {};

		// Si cette grille est enregistrée, on l'affiche directement
		if (savedStations[$scope.params.numLine + $scope.params.stationCode] !== undefined) {
			$scope.station = savedStations[$scope.params.numLine + $scope.params.stationCode];

			// TODO: sélectionner horaires suivants

			$scope.stopLoading();

		// Sinon, on l'a récupère via l'API
		} else {
			TanFactory.getStationTimeTables($scope.params.stationCode, $scope.params.numLine, $scope.params.direction).then(function (data) {
				$scope.station = data;
				$scope.station.stationCode = $scope.params.stationCode;
				$scope.station.direction = $scope.params.direction;
				$scope.station.directionName = $scope.station.ligne["directionSens"+$scope.params.direction];

				// On sélectionne les prochains horaires à venir
				$timeout(function(){ 
					angular.forEach($scope.station.prochainsHoraires, function (item, key) {
						angular.element(document.querySelector('#tr'+item.heure)).addClass('active');
						angular.element(document.querySelector('#td'+item.heure+item.passages[0])).addClass('active');
					});
				}, 200);
				
				$scope.stopLoading();
			}, function (error) {
				$scope.error(error);
			});
		}
	}

	// Recherche les stations correspondant au champs texte 'searchStationName'
	// $scope.search = function () {
	// 	if ($scope.searchStationName.length > 1) {
	// 		TanFactory.getStationsByName($scope.searchStationName).then(function (stations) {
	// 			$scope.stations = stations;
	// 		}, function (error) {
	// 			$scope.error(error);
	// 		});
	// 	}
	// };

	// Recherche les stations les plus proches grâce à la localisation de l'utilisateur
	$scope.searchByLocalization = function () {
		$scope.startLoading();

		// Succès de la localisation
		var onSuccess = function (position) {
			TanFactory.getStationsByPosition(position).then(function (stations) {
				$scope.stations = stations;
				$scope.stopLoading();
			}, function (error) {
				$scope.error(error);
			});
		};

		// Erreur de la localisation
		var onError = function(error) {
			$scope.error("Erreur " + error.code + "\n" + error.message + "\n");
			$scope.stopLoading();
		};

		// Récupération de la position courante
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	};

	// Fonction précédent 
	$scope.previous = function () {
		if ($scope.params.numLine) {
			$location.path('/timetables/' + $scope.params.stationCode + "/" + $scope.params.stationName);
		} else {
			$location.path('/timetables');
		}
	};
	
}]);
