'use strict';

angular.module('angularTable', [])
	.factory('TableService', function ($http) {
		var TableService = {
			getColors: function() {
			  var promise = $http.get('data.json').then(function (response) {
				return response.data;
			  });
			  return promise;
			}
		  };
		return TableService;
	})

	.controller('TableController', ['$scope', 'TableService', function ($scope, TableService) {
		
		TableService.getColors().then(function(colors) {
			$scope.colors = colors.colorsArray;
		});
		
	}])

	.directive('colorTable', function () {
		return {
			restrict: 'E',
			templateUrl: 'table.html',
			controller: 'TableController'
		};
	})
;
