angular.module('Selection', []);

angular.module('Selection').directive("selection", ['$parse',function($parse){
	return {
    priority: 1100,
		restrict : 'A',
		scope : {
			selectedCollection : "=selection",
		},
		link : function($scope,$element,$attr){
      var selecteur = null;
			var expression = $attr.ngRepeat;
      var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
        trackByExp, trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn,
        lhs, rhs, valueIdentifier, keyIdentifier;


      if (!match) {
        throw ngRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
        expression);
      }
			nameItem = match[1];
	    nameCollectionAndFiltre = match[2];

      $scope.isReady = function(){
        if(_.isArray($scope.selectedCollection) && _.isArray($scope.collection)){
          return true;
        }
        return false;
      }

      $scope.$watch("isReady()",function(newVal,oldVal){
        if(newVal === true){
          init(); 
        } else {
          destroyEvent();
        }
        
      });

      //get $scope.collection in parent
      $scope.$parent.$watchCollection(nameCollectionAndFiltre,function(collection){
        initCollection(collection);
      });
      //get $scope.selectedCollection in scope
      $scope.$watchCollection('selectedCollection',function(collection){
        initSelectedCollection(collection);
      });

      
      function initCollection(collection){
        console.log(collection,"initCollection");
        $scope.collection = collection;
        //$scope.collection is Array
        if(_.isUndefined($scope.collection)){
          $scope.collection = [];
        } else if(!_.isArray($scope.collection)){
          $scope.collection = [];
        }        
      }
      function initSelectedCollection(collection){
        console.log(collection,"initSelectedCollection");
        $scope.selectedCollection = collection;
        //$scope.collection is Array
        if(_.isUndefined($scope.selectedCollection)){
          $scope.selectedCollection = [];
        } else if(!_.isArray($scope.selectedCollection)){
          $scope.selectedCollection = [];
        }
        if(_.size($scope.selectedCollection) > 0){
          //update scope item
          //Vérifier que les items existe tous
          _.each($scope.selectedCollection,function(el,ite){
            if(_.indexOf($scope.collection,el) === -1){
              console.error("element is not in collection");
              $scope.selectedCollection.splice(ite,1);
            }
          });
          
        }
      }
      function init() {
        console.log("init");
        selecteur = $element.next().get(0).nodeName;
        initChildScope();
        initWatcher();
        initEvent(); 

      }
      function initChildScope() {
        console.log("initChildScope");
        $element.parent().find(selecteur).each(function(){
          var scopeChild = $(this).scope();
          var item = scopeChild.$eval(nameItem);
          if(_.contains($scope.selectedCollection,item)){
            scopeChild.$selected = true;
          } else {
            scopeChild.$selected = false;
          }
        });
      }
      function initEvent(){
        $element.parent().on("click",selecteur,function(e){
          console.log("click");
          var scopeItem = $(this).scope();
          //unique selected
          scopeItem.$selected = !scopeItem.$selected;
          scopeItem.$apply(function(){
            
          });
        });
      }
      function initWatcher(){
        console.log("initWatcher");
       $element.parent().find(selecteur).each(function(){
          var scopeItem = $(this).scope();
          scopeItem.$watch("$selected",function(newVal,oldVal){
            //update selected collection
            var item = scopeItem.$eval(nameItem);
            var index = _.indexOf($scope.selectedCollection,item);
            if(newVal === true){
              if(index === -1){
                $scope.selectedCollection.push(item);  
              }
            } else {
              if(index !== -1){
                $scope.selectedCollection.splice(index,index+1);
              }
            }
            console.log(newVal,oldVal,$scope.selectedCollection);  
            
          });
        }); 
      }

      function destroyEvent(){
        //TODO destroy all Event
      }

      function updateScopeItem(){
        _.each($scope.selectedCollection,function(el){
          if(_.contains($scope.collection,el)){
            //Récupérer le scope de l'enfant et le mettre à

          } else {
            //TODO gestion erreur un item de selectedCollection n'existe pas dans la collection
          }
        });
      }

			//console.log(NgModelController);
			//Si on veut récupérer la collection
			/*
			


			$scope.$parent.$watchCollection(rhs,function(collection){
				console.log(collection,"change in parent scope");
				$scope.collection = collection;
			});
			*/
/*
			function inSelectedCollection(item){
        console.log($scope.selectedCollection,"selectedCollection");
				return _.contains($scope.selectedCollection,item);
			}
      
			$element.on("click",function(event){
				var item = $(this).scope().$eval(nameItem);
        
				if(!inSelectedCollection(item)){
					$scope.$apply(function(){
						$scope.selectedCollection.splice(0, _.size($scope.selectedCollection));
						$scope.selectedCollection.push(item);
					});
				}
				console.log($scope.selectedCollection,$scope);
			});
*/
		}
	}
}]);


angular.module('Selection').directive('ioMultiSelect',[function(){
  var ioMultiSelect = {
      restrict:'A',
      scope : true,
      require: '?ngModel',
      link : function (scope, element, attrs, ngModel){
        if(!ngModel) return; // do nothing if no ng-model
        
        var opts,
        attrSelected,
        subElementSelector,
        lastIndex = null,
        indexShiftSave = null;
        
        scope.$watch(attrs.ioMultiSelect,function(options){
          opts = angular.extend({}, options);
          attrSelected = angular.isString(opts.attrSelected)?opts.attrSelected:"$selected";
          subElementSelector = angular.isString(opts.subElementSelector)?opts.subElementSelector:"li:not(.disabled)";
          element.off("click",subElementSelector,onClick);
          element.on("click",subElementSelector,onClick);
          scope.$emit("init");
        });
        
        function onClick(e){
          scope.$apply(update(e,this));
        }
        
        function update(event,rowElement) {
          //Déterminer si on purge
          var row = $(rowElement),
          index = row.index(),
          metaKey = event.metaKey||event.ctrlKey,
          shiftKey = event.shiftKey;
          
          console.log(rowElement);
          if(!shiftKey){
            indexShiftSave = null;
          } else if(indexShiftSave === null){
            indexShiftSave = lastIndex;  
          }
          
          if(!(metaKey || shiftKey)){
            //Réinitialisation de la liste;
            _.each(ngModel.$modelValue,function(el){
            	console.log(el);
              el[attrSelected] = false;
            });
          }
          
          var selected = ngModel.$modelValue[index][attrSelected];
          console.log(ngModel.$modelValue[index][attrSelected]);
          if(!shiftKey) {
            if(!selected){
              updateItem(index,true);
            } else if(metaKey && selected){
              updateItem(index,false);
            }
          } else {
            _.each(ngModel.$modelValue,function(el,ite){
              //les limites toujours vrai
              if(ite === index || ite === indexShiftSave){
                updateItem(ite,true);
              } else {
                if(
                    (indexShiftSave > index && ite >= index && ite <= indexShiftSave) ||
                    (indexShiftSave < index && ite <= index && ite >= indexShiftSave)
                ){
                  updateItem(ite,true);
                } else {
                  updateItem(ite,false);
                }
              }
            });
          }
          
          lastIndex = index;
        }
        
        function updateItem(indexItem,value) {
          if(itemValide(indexItem)){
            ngModel.$modelValue[indexItem][attrSelected] = value;
            scope.$emit("refresh",indexItem,value);
          }
        }
        
        function itemValide(indexItem) {
          var itemElement = element.children().get(indexItem);
          var test = element.find(subElementSelector).filter(itemElement);
          if(test.length > 0){
            return true;
          } else {
            return false;
          }
        }
        
        
      }
  };
  return ioMultiSelect;
}]);