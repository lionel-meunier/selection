angular.module('App').controller("testSelectionCtrl",["$scope",function($scope){

	$scope.listTest1 = ["Test1","Test2","Test3","Test4"];

	$scope.listTest1Selected = ["Test1","Test5"];

	$scope.listTest2 = [{name:"Test1"},{name:"Test2"},{name:"Test3"},{name:"Test4"}];

	$scope.listTest2Selected = [{name:"Test1"}];

	$scope.$watch("listTest1Selected",function(test){
		console.log($scope.listTest1Selected,"$scope.listTest1Selected in app");
	},true);

	$scope.add = function(val){
		$scope.listTest1.push(val);
	}
	$scope.remove = function(val){
		var index = _.indexOf($scope.listTest1,val);
		if(index !== -1){
			$scope.listTest1 = _.without($scope.listTest1,val);
		}
	}
	$scope.addTest = function(val){
		$scope.listTest1Selected.push(val);
	}
	$scope.removeTest = function(val){
		var index = _.indexOf($scope.listTest1Selected,val);
		if(index !== -1){
			$scope.listTest1Selected = _.without($scope.listTest1Selected,val);
		}
	}
}]);

angular.module('App').filter('reverse', function() {
	return function(items) {
	  if(!_.isUndefined(items)){
	    return items.slice().reverse();
	  }
	};
});