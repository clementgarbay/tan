app.controller('MapsCtrl', ['$scope', function ($scope) {

	// Affichage du plan correspondant
	$scope.openMap = function (map) {

		if (angular.element(document.querySelector('.content')).hasClass('ios')) {
			
			var path = window.location.href.replace("index.html#/maps", 'data/' + map + '.pdf');

			PDFReader.open(path, {
				enableThumbs: false,
				bookmarks: false
			}, function () {}, function (error) {
				$scope.error("Erreur lors de l'ouverture du plan");
			});
		} else {
			window.open('data/' + map + '.pdf', '_blank', 'location=yes');
		}
	};

}]);
