
(function () {

  'use strict';

  describe('directive selection', function () {
    var $compile;
    var $rootScope;
    var $log;
    var $element;
    var $filter;

    beforeEach(module('lionel-meunier.selection'));

    beforeEach(inject(function(_$compile_, _$rootScope_,_$log_,_$filter_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $filter = _$filter_;
      $log = _$log_;
    }));

    it('Update $selected to last before first selectedCollection no ordering selectedOrdering' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var scopeItemIsolate = element.scope().$$childHead;
      var lastElement = element.find("li:last-child");
      var lastScope = lastElement.scope();
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      lastScope.$selected = true;
      $rootScope.$digest();
      firstScope.$selected = true;
      $rootScope.$digest();
      expect(_.first(scopeItemIsolate.selectedCollection)).toBe(_.last($rootScope.list));
    });

    it('Update $selected to last before first selectedCollection with ordering selectedOrdering' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var scopeItemIsolate = element.scope().$$childHead;
      
      var lastElement = element.find("li:last-child");
      var lastScope = lastElement.scope();
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      lastScope.$selected = true;
      $rootScope.$digest();
      firstScope.$selected = true;
      $rootScope.$digest();
      var listOrdering = $filter("selectedOrdering")(scopeItemIsolate.selectedCollection,$rootScope.list);
      expect(_.first(scopeItemIsolate.selectedCollection)).toBe(_.last($rootScope.list));
      expect(_.first(listOrdering)).toBe(_.first($rootScope.list));
    });
  });

})();