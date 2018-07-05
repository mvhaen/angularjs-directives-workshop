(function(){

    'use strict';
    
    var $ = require('jquery');
    require('angular');
    
    angular.module('myApp').controller('MyController', MyController);

    MyController.$inject = ['$scope'];

    function MyController($scope) {
        $scope.actors = [{
                name: 'Amit Khan'
            }, {
                name: 'Salman Khan'
            }, {
                name: 'Shahrukh Khan'
            }, {
                name: 'Irfan Khan'
            }, {
                name: 'Saif ALi Khan'
            }];

        $scope.add = function() {
            $scope.actors.push({name: 'Naya Khan'});
        }

        $scope.remove = function() {
            $scope.actors.length--;
        }
    }

    angular.module('myApp').directive('myRepeat', MyRepeatDirective);

    function MyRepeatDirective() {
        return {
            restrict: 'A',
            transclude: 'element',
            link: MyRepeatDirectiveLink
        };
    }

    function MyRepeatDirectiveLink(scope, el, attrs, ctrl, transclude) {
        var pieces = attrs.myRepeat.split(' ');
        var itemString = pieces[0];
        var collectionName = pieces[2];
        var elements = [];
        
        scope.$watchCollection(collectionName, function(collection) {
            if( elements.length > 0) {
                for(var i = 0; i < elements.length; i++) {
                    elements[i].el.remove();
                    elements[i].scope.$destroy();
                }
                elements = [];
            }

            for( var i =0; i < collection.length; i++ ) {
                var childScope = scope.$new();
                childScope[itemString] = collection[i];
                transclude(childScope, function(clone){
                    $(el).before(clone);
                    var item = {};
                    item.el = clone;
                    item.scope = childScope;
                    elements.push(item);
                });
            }
        });
    }
})();