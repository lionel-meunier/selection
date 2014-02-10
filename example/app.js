angular.module('App').controller("testSelectionCtrl",["$scope",function($scope){

	$scope.listTest1 = ["Test1","Test2","Test3","Test4"];

	$scope.listTest1Selected = ["Test1"];

	$scope.listTest2 = [{name:"Test1"},{name:"Test2"},{name:"Test3"},{name:"Test4"}];

	$scope.listTest2Selected = [{name:"Test1"}];
}]);

angular.module('App').filter('reverse', function() {
	return function(items) {
	  if(!_.isUndefined(items)){
	    return items.slice().reverse();
	  }
	};
});