
(function () {

  'use strict';

  describe('directive selection', function () {
    var $compile;
    var $rootScope;
    var $log;
    var $element;

    beforeEach(module('lionel-meunier.selection'));

    beforeEach(inject(function(_$compile_, _$rootScope_,_$log_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $log = _$log_;
    }));

    it('ng-repeat attr present no error', function() {
      spyOn($log, 'error');
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      expect($log.error).not.toHaveBeenCalled();
    });

    it('ng-repeat attr no present log error', function() {
       spyOn($log, 'error');
       $rootScope.list = window.listMock.list;
       var element = $compile(window.listMock.htmlError)($rootScope);
       $rootScope.$digest();
       expect($log.error).toHaveBeenCalled();
    });
/*
???
    it('ng-repeat match error', function() {
       spyOn($log, 'error');
       $rootScope.list = window.listMock.list;
       var element = $compile(window.listMock.htmlRepeatError)($rootScope);
       expect($log.error).toHaveBeenCalled();
    });
*/
    it('Compatibility with ng-repeat', function() {
        $rootScope.list = window.listMock.list;
        // Compile a piece of HTML containing the directive
        var element = $compile(window.listMock.html)($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("Test1");
    });


    it('Selected Collection create if don\'t specified' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
       //Récupération du scope isoler de la directive
      var scopeItemIsolate = element.scope().$$childHead;
      expect(_.isArray(scopeItemIsolate.selectedCollection)).toBe(true);
    });

    it('Selected Collection create if specified with list no contains item to collection' , function() {
      $rootScope.list = window.listMock.list;
      $rootScope.listSelected = [_.first(window.listMock.list)];
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
       //Récupération du scope isoler de la directive
      var scopeItemIsolate = element.scope().$$childHead;
      expect(_.contains(scopeItemIsolate.selectedCollection,_.first(window.listMock.list))).toBe(true);
    });

    it('Initialize scope item $selected' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var children = element.find("li");
      children.each(function(ite,el){
        expect(_.isUndefined($(el).scope().$selected)).toBe(false);
      });
    });

    it('Update $selected to add selectedCollection' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var scopeItemIsolate = element.scope().$$childHead;
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      firstScope.$selected = true;
      $rootScope.$digest();
      expect(_.size(scopeItemIsolate.selectedCollection)).toBe(1);
    });

    it('Update $selected to remove selectedCollection' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var scopeItemIsolate = element.scope().$$childHead;
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      firstScope.$selected = true;
      $rootScope.$digest();
      expect(_.size(scopeItemIsolate.selectedCollection)).toBe(1);
      firstScope.$selected = false;
      $rootScope.$digest();
      expect(_.size(scopeItemIsolate.selectedCollection)).toBe(0);
    });

  });

})();