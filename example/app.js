angular.module('App', ['lionel-meunier.selection']);

angular.module('App').controller("testSelectionCtrl",["$scope",function($scope){

	$scope.listTest1 = ["Test1","Test2","Test3","Test4"];

	$scope.listTest1Selected = ["Test1","Test5"];


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
