var app = angular.module('App', [
	'ngRoute',
	'ngTouch',
	'mobile-angular-ui',
]);

app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/timetables', {
			templateUrl: 'partials/timetables.html', 
			controller: 'TimetablesCtrl'
		})
		.when('/timetables/:stationCode/:stationName', {
			templateUrl: 'partials/timetables.html', 
			controller: 'TimetablesCtrl'
		})
		.when('/timetables/:stationCode/:stationName/:numLine/:direction', {
			templateUrl: 'partials/timetables.html', 
			controller: 'TimetablesCtrl'
		})
		.when('/infos', {
			templateUrl: 'partials/infos.html', 
			controller: 'InfosCtrl'
		})
		.when('/maps', {
			templateUrl: 'partials/maps.html', 
			controller: 'MapsCtrl'
		})
		.when('/offline', {
			templateUrl: 'partials/offline.html', 
			controller: 'OfflineCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.filter('keylength', function() {
	return function (input) {
		if (angular.isObject(input)) {
			return Object.keys(input).length;
    	}
	};
});