app.directive('touchable', ['$swipe', function($swipe) {
	return {
		restrict: 'EA',
		link: function(scope, element, attrs, ctrl) {
			var startX, startMarginLeft;

			$swipe.bind(element, {
				'start': function (coords) {
					startX = coords.x;
					startMarginLeft = (element.css('margin-left') !== '') ? parseInt(element.css('margin-left')) : 0;
				},
				'move': function (coords) {
					var delta = coords.x - startX;
					var shift = startMarginLeft + delta;

					if (shift < 0) {
						element.css('margin-left', shift + 'px');
					} else {
						element.css('margin-left', '0px');
					}
				},
				'end': function (coords) {
					
				},
				'cancel': function (coords) {
					
				}
			});
		}
	};
}]);