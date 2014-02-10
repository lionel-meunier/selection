
(function () {

  'use strict';

  describe('directive selection test', function () {
    var $compile;
    var $rootScope;
    var $element;

    beforeEach(module('Selection'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('Compatibility with ng-repeat', function() {
        $rootScope.list = window.listMock.list;
        // Compile a piece of HTML containing the directive
        var element = $compile(window.listMock.html)($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("Test1");
    });

    it('Collection create with ng-repeat' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      //Récupération du scope isoler de la directive
      var scopeItemIsolate = element.scope().$$childHead;
      expect(scopeItemIsolate.collection).toEqual($rootScope.list);
    });

    it('Selected Collection create if don\'t specified' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
       //Récupération du scope isoler de la directive
      var scopeItemIsolate = element.scope().$$childHead;
      //console.log(scopeItem.$$childTail);
      expect(_.isArray(scopeItemIsolate.selectedCollection)).toBe(true);
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

    it('Click item update scope $selected' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      firstElement.trigger('click');
      expect(firstScope.$selected).toBe(true);
    });

    it('One $seleted for click' , function() {
      $rootScope.list = window.listMock.list;
      var element = $compile(window.listMock.html)($rootScope);
      $rootScope.$digest();
      var firstElement = element.find("li:first-child");
      var firstScope = firstElement.scope();
      firstElement.trigger('click');
       //Récupération du scope isoler de la directive
      var scopeItemIsolate = element.scope().$$childHead;

      expect(_.size(scopeItemIsolate.selectedCollection)).toBe(1);
    });
    /*
    it('With click $selected in scope', function() {
        $rootScope.list = window.listMock.list;
        // Compile a piece of HTML containing the directive
        var element = $compile(window.listMock.html)($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        var element2 = element.find("li").eq(2);
        console.log(element2.click(),"click");
        //element2.click();
        console.log(element.find("li").eq(1).html());

        // Check that the compiled element contains the templated content


        expect(element.html()).toContain("Test1");
    });
    */
  });

})();