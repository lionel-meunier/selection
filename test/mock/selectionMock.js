(function (window) {

  'use strict';

  window.listMock = window.listMock || {};

  window.listMock.list = ["Test1","Test2","Test3","Test4"];
  window.listMock.html = "<ul><li ng-repeat=\"item in list\" selection=\"listSelected\"><a ng-class=\"{'selected':$selected}\" ng-click=\"$selected=!$selected\">{{item}}</a></li></ul>";
  window.listMock.htmlSelected = "<ul><li ng-repeat=\"item in listSelected | selectedOrdering : list\" >{{item}}</li></ul>";
  window.listMock.htmlError = "<ul><li selection=\"listSelected\"><a ng-class=\"{'selected':$selected}\">{{item}}</a></li></ul>";
  window.listMock.htmlRepeatError = "<ul><li ng-repeat=\"item list\" selection=\"listSelected\"><a ng-class=\"{'selected':$selected}\">{{item}}</a></li></ul>";
  window.funcMock = {};
})(window);