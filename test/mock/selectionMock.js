(function (window) {

  'use strict';

  window.listMock = window.listMock || {};

  window.listMock.list = ["Test1","Test2","Test3","Test4"];
  window.listMock.html = "<ul><li ng-repeat=\"item in list\" selection=\"listSelected\"><a ng-class=\"{'selected':$selected}\">{{item}}</a></li></ul>";
  window.funcMock = {};
  window.funcMock.dislpayObj = function(obj){
	_.each(obj,function(val,key){
		console.log(key,typeof val);
	});
  };
})(window);