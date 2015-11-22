// Service permettant la récupération des données via l'API
app.factory('TanFactory', ['$http', '$q', function ($http, $q) {

	var factory = {

		deferred: null,
		stations: null,
		waitingTime: null,

		getStations: function () {
			factory.deferred = $q.defer();

			if (factory.stations !== null) {
				factory.deferred.resolve(factory.stations);
			} else {
				$http.get("https://open.tan.fr/ewp/arrets.json")
					.success(function (data, status) {
						factory.deferred.resolve(data);
					})
					.error(function (data, status) {
						console.error(data);
						factory.deferred.reject("Erreur "+status+". \nImpossible de récupérer les informations concernant les arrêts.");
					});
			}

			return factory.deferred.promise;
		},

		getStationsByPosition: function (position) {
			factory.deferred = $q.defer();
			var positionOption = (position !== null) ? (position.coords.latitude + "/" + position.coords.longitude) : "";

			$http.get("https://open.tan.fr/ewp/arrets.json/" + positionOption.replace(/\./g, ','))
				.success(function (data, status) {
					factory.deferred.resolve(data);
				})
				.error(function (data, status) {
					console.error(data);
					factory.deferred.reject("Erreur "+status+". \nImpossible de récupérer les informations concernant les arrêts à proximité.");
				});

			return factory.deferred.promise;
		},

		getStationWaitingTime: function (stationCode) {
			factory.deferred = $q.defer();

			// if (factory.waitingTime !== null && factory.waitingTime.stationCode === stationCode) {
			// 	factory.deferred.resolve(factory.waitingTime.data);
			// } else {
				$http.get("https://open.tan.fr/ewp/tempsattente.json/" + stationCode)
					.success(function (data, status) {
						factory.waitingTime = {};
						factory.waitingTime.stationCode = stationCode;
						factory.waitingTime.data = data;
						factory.deferred.resolve(data);
					})
					.error(function (data, status) {
						console.error(data);
						factory.deferred.reject("Erreur "+status+". \nImpossible de récupérer les temps d'attente concernant l'arrêt demandé.");
					});
			// }

			return factory.deferred.promise;
		},

		getStationTimeTables: function (stationCode, numLine, direction) {
			factory.deferred = $q.defer();

			$http.get("https://open.tan.fr/ewp/horairesarret.json/" + stationCode + "/" + numLine + "/" + direction)
				.success(function (data, status) {
					factory.deferred.resolve(data);
				})
				.error(function (data, status) {
					console.error(data);
					factory.deferred.reject("Erreur "+status+". \nImpossible de récupérer les horaires concernant la ligne et l'arrêt demandé.");
				});

			return factory.deferred.promise;
		},

		getInfoTrafic: function () {
			factory.deferred = $q.defer();

			var key = "39W9VSNCSASEOGV";

			$http.get("http://data.nantes.fr/api/getInfoTraficTANTempsReel/1.0/" + key + "/?output=json")
				.success(function (data, status) {
					factory.deferred.resolve(data);
				})
				.error(function (data, status) {
					console.error(data);
					factory.deferred.reject("Erreur "+status+". \nImpossible de récupérer les infos trafic.");
				});

			return factory.deferred.promise;
		},

		cancel: function () {
			if (factory.deferred !== null) {
				factory.deferred.resolve();
				return factory.deferred.promise;
			}
		}
	};

	return factory;
}]);
