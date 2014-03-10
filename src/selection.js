angular.module('lionel-meunier.selection', []);

angular.module('lionel-meunier.selection').directive("selection", ['$parse', '$log',
  function($parse, $log) {

    SelectionCtrl.$inject = ['$scope','$element', '$attrs' ];
    function SelectionCtrl($scope,$element, $attrs){
      if (hasErrorConf($attrs) === false) {
          var conf = getConf($attrs);
          var watchedScope = [];
          var selecteur = $element.nodeName;

          //Watch collection
          if (!_.isUndefined(conf.nameCollection)) {
            $scope.$parent.$watchCollection(conf.nameCollection, function(collection) {
              if (!_.isUndefined(collection) && _.isArray(collection)) {
                initSelected(collection);
                initChildScope();
              }
            });
          }
          //Watch selectedCollection
          $scope.$watchCollection('selectedCollection', function(collection) {
            if (!_.isUndefined(collection) && _.isArray(collection)) {
              initChildScope();
            }
          });

        }

        function initSelected(collection) {
          $scope.selectedCollection = _.filter($scope.selectedCollection,function(item){
            if(_.contains(collection,item)) return true;
          });;
        }

        
        function watchSelected(newVal, oldVal, scopeItem) {
          var item = scopeItem.$eval(conf.nameItem);
          var index = _.indexOf($scope.selectedCollection, item);
          var collection = $parse(conf.nameCollection)($scope.$parent);
          var reelIndex = _.indexOf(collection, item);
          if (newVal === true) {
            if (index === -1) {
              //TODO ajout au bonne endroit
              $scope.selectedCollection.push(item);
            }
          } else {
            if (index !== -1) {
              $scope.selectedCollection = _.without($scope.selectedCollection, item);
            }
          }
        }

        function initChildScope() {
          destroyAllWatch();
          var curentElement = $element.next();
          while (isNoComment(curentElement)) {
            var scopeItem = curentElement.scope();
            //Initialiser le scope par défaut
            var item = scopeItem.$eval(conf.nameItem);
            if (_.contains($scope.selectedCollection, item)) {
              scopeItem.$selected = true;
            } else {
              scopeItem.$selected = false;
            }
            //Mettre le watch
            var scopeItemWatch = scopeItem.$watch("$selected", watchSelected);
            watchedScope.push(scopeItemWatch);
            curentElement = curentElement.next();
          }
        }

        function destroyAllWatch() {
          if (_.size(watchedScope) > 0) {
            _.each(watchedScope, function(fn) {
              fn();
            });
          }
          watchedScope = [];
        }
    }

    function hasErrorConf($attrs) {
      if (_.isUndefined($attrs.ngRepeat)) {
        $log.error("$attrs.ngRepeat not defined");
        return true;
      } else if(!matchNgRepeat($attrs)) {
        $log.error("match $attrs.ngRepeat");
        return true;
      }
      return false;
    }

    function matchNgRepeat($attrs) {
      return $attrs.ngRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
    }

    function getConf($attrs) {
      var conf = {};
      var match = matchNgRepeat($attrs);
      conf.nameItem = match[1];
      conf.nameCollection = match[2];
      return conf;
    }

    function isNoComment(element) {
      //Doit être définie
      if (_.isUndefined(element.get(0))) {
        return false;
      }
      return true;
    }

    return {
      priority: 1100,
      restrict: 'A',
      scope: {
        selectedCollection: "=selection",
      },
      controller : SelectionCtrl
    }
  }
]);


angular.module('lionel-meunier.selection').filter('selectedOrdering', ['$parse',function($parse){
  return function(selectedCollection,collection){
    var newSelCol = [];
    _.each(selectedCollection,function(item){
      if(_.contains(collection,item)){
        var reelIndex = _.indexOf(collection, item);
        newSelCol[reelIndex] = item;
      }
    });
    selectedCollection = _.compact(newSelCol);
    return selectedCollection;
  };
}]);