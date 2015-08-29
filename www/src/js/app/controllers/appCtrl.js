app.controller('AppCtrl', ['$scope', '$location', '$route', '$rootScope', 'TanFactory', function ($scope, $location, $route, $rootScope, TanFactory) {

	$scope.onLine = function () {
		return window.navigator.onLine;
	};

	$scope.error = function (error) {
		if (typeof navigator !== "undefined" && navigator.notification) {
			navigator.notification.alert(error, function () {}, "Erreur", ['OK']);
		} else {
			alert(error);
		}
	};

	// Gestion de l'affichage du panneau de chargement
	$scope.loading = false;
	$scope.startLoading = function () {
		$scope.loading = true;
	};
	$scope.stopLoading = function () {
		$scope.loading = false;
	};

	// Récupère le chemin correspondant au template courant
	$scope.path = function () {
		return $location.path().split("/")[1];
	};

	// Recharge la route courante
	$scope.refresh = function () {
		$route.reload();
	};

	$scope.openExternal = function (url) {
		if (typeof navigator !== "undefined" && navigator.app) {
			navigator.app.loadUrl(url, {openExternal: true});
		} else {
			window.open(url, "_blank");
		}
	};

	// Lors du changement d'URL (de route), masquer le panneau de chargement et annuler les requêtes en cours
	$rootScope.$on("$routeChangeStart", function (args) {
		$scope.stopLoading();
		TanFactory.cancel();
	});


	// GESTION DE LA SAUVEGARDE DES GRILLES HORAIRES POUR UNE UTILISATION HORS LIGNE
	
	// Créer un identifiant unique correspondant à un arrêt (et une direction) pour une ligne à partir d'un objet de grille horaires
	$scope.offline_getId = function (station) {
		return station.ligne.numLigne + station.stationCode;
	};

	// Sauvegarde un objet de grille horaires pour un affichage hors ligne
	$scope.offline_save = function (station) {
		var savedStations = JSON.parse(localStorage.getItem('stations'));

		if (savedStations === null) {
			savedStations = {};
		}

		savedStations[$scope.offline_getId(station)] = station;
		localStorage.setItem('stations', JSON.stringify(savedStations));
	};

	// Teste si un objet de grille horaires est sauvegardé
	$scope.offline_isSaved = function (station) {
		var savedStations = JSON.parse(localStorage.getItem('stations')) || {};

		return savedStations[$scope.offline_getId(station)] !== undefined;
	};

	// Supprime un objet de grille horaires de l'affichage hors ligne
	$scope.offline_remove = function (station) {
		var savedStations = JSON.parse(localStorage.getItem('stations'));

		if ($scope.offline_isSaved(station)) {
			delete savedStations[$scope.offline_getId(station)];
		}

		localStorage.setItem('stations', JSON.stringify(savedStations));
	};

	// Suppression de l'ensemble des grilles horaires enregistrées
	$scope.offline_clear = function () {

		if (angular.element(document.querySelector('.content')).hasClass('ios')) {
			var confirmCallback = function () {
				if (button == 1) {
					localStorage.removeItem('stations');
					$scope.refresh();
				}
			};

			navigator.notification.confirm('Êtes-vous sûr de vouloir supprimer toutes les grilles horaires enregistrées ?', confirmCallback, 'Confirmer la suppression', ['Oui', 'Annuler']);
		} else {
			if (confirm('Êtes-vous sûr de vouloir supprimer toutes les grilles horaires enregistrées ?')) {
				localStorage.removeItem('stations');
				$scope.refresh();
			}
		}
	};

}]);
