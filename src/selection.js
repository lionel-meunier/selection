angular.module('Selection', []);
angular.module('Selection').constant("configuration", {
  listSelected: {
    strict: true
  },
  mode: 'checkbox'
});
angular.module('Selection').directive("selection", ['$parse',
  function($parse) {
    return {
      priority: 1100,
      restrict: 'A',
      scope: {
        selectedCollection: "=selection",
      },
      link: function($scope, $element, $attr) {
        var selecteur = $element.nodeName;
        var expression = $attr.ngRepeat;
        var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
          trackByExp, trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn,
          lhs, rhs, valueIdentifier, keyIdentifier;
        var watchedScope = [];

        if (!match) {
          throw ngRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
            expression);
        }
        nameItem = match[1];
        nameCollectionAndFiltre = match[2];
        

        //get $scope.collection in parent
        $scope.$parent.$watchCollection(nameCollectionAndFiltre, function(collection) {
          if (!_.isUndefined(collection) && _.isArray(collection)) {
            //avant mettre à jour le tableau de watch on le kill et on le recrée
            initSelecteur();
            initWatched();
            $scope.collection = collection;
            initSelectedCollection();
            initChildScope();
          }
          //initCollection(collection);
          //TODO quand la liste est prète ou change mettre à jour les scopes enfants et leur watch
        });
        //get $scope.selectedCollection in scope
        $scope.$watchCollection('selectedCollection', function(collection) {
          if (!_.isUndefined(collection) && _.isArray(collection)) {
            $scope.selectedCollection = collection;
            initSelectedCollection();
            initChildScope();
          }
          //TODO quand la liste est prète ou change mettre à jour les scopes enfants
        });

        function initSelectedCollection(){
          //Suivant configuration
          //Si restricte enlever tous les élements non présent dans la collection

          $scope.selectedCollection = _.filter($scope.selectedCollection,function(item){
            var index = _.indexOf($scope.collection, item);
            if(index !== -1){
              return true;
            }
          });
        };

        function initWatched() {
          if(_.size(watchedScope) > 0){
            _.each(watchedScope,function(fn){
              fn();
            });
          }
          watchedScope = [];
          $element.parent().find(selecteur).each(function() {
            var scopeItem = $(this).scope();
            var scopeItemWatch = scopeItem.$watch("$selected", function(newVal, oldVal) {
              //update selected collection
              var item = scopeItem.$eval(nameItem);
              var index = _.indexOf($scope.selectedCollection, item);
              if (newVal === true) {
                if (index === -1) {
                  $scope.selectedCollection.push(item);
                }
              } else {
                if (index !== -1) {
                  $scope.selectedCollection = _.without($scope.selectedCollection,item);
                }
              }
            });
            watchedScope.push(scopeItemWatch);
          });

        }

        function initSelecteur() {
          if(_.size($element.next()) !== 0){
            selecteur = $element.next().get(0).nodeName;  
          }
          destroyEvent();
          initEvent();
        }

        function initChildScope() {
          $element.parent().find(selecteur).each(function() {
            var scopeChild = $(this).scope();
            var item = scopeChild.$eval(nameItem);
            if (_.contains($scope.selectedCollection, item)) {
              scopeChild.$selected = true;
            } else {
              scopeChild.$selected = false;
            }
          });
        }

        function initEvent() {
          $element.parent().on("click", selecteur,clickEvent);
        }
        function clickEvent(e) {
            //console.log(e);
            var scopeItem = $(this).scope();
            //unique selected
            scopeItem.$selected = !scopeItem.$selected;
            scopeItem.$apply(function() {

            });
        }
        function destroyEvent() {
          //TODO destroy all Event
          $element.parent().off("click", selecteur,clickEvent);
        }

        function updateScopeItem() {
          _.each($scope.selectedCollection, function(el) {
            if (_.contains($scope.collection, el)) {
              //Récupérer le scope de l'enfant et le mettre à

            } else {
              //TODO gestion erreur un item de selectedCollection n'existe pas dans la collection
            }
          });
        }
      }
    }
  }
]);

