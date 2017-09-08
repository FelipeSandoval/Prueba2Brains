'use strict';

var app = angular.module('myModule', ['ngSanitize', 'ui.select','ui.bootstrap','ngAnimate']);

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('DemoCtrl', function ($scope, $http, $timeout, $interval,$uibModal) {
    var vm = this;

      vm.editorial = [
        { name: 'Marvel', function: false},
        { name: 'DC', function: false},
        { name: 'Valiant', function: true},
        { name: 'Dark Horse', function: false},
      ];


    vm.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            component: 'modalComponent',
            controller: 'ModalInstanceCtrl',
            controllerAs: 'vm',
            scope: $scope
          
        });

        modalInstance.opened.then(function () {
             console.log("its is open");   
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
          console.log("you got out");
        });
    };

    $scope.$watch("ctrl.editorial.selected",function(newValue,oldValue) {
         //console.log(newValue);
         if(newValue != undefined && newValue.function){
            vm.openComponentModal();
         }  
    });

});

//controller('DemoCtrl', function ($scope, $http, $timeout, $interval,$uibModal)
var appModal = angular.module('myModule').component('modalComponent', {
  templateUrl: 'myModalContent.html',
  controller: function () {
    var vm = this;
    //vm.$onInit = function () {
        //console.log(list);
        var dataSet = [
                 ["Sting","Peter Stancheck","Renegades","asdasdads","","","","","","","","","",""],
                 ["Zephyr","Faith Herbert","Renegades","asdasdads","","","","","","","","","",""],
                 ["Torque","John Torkelson","Renegades","asdasdads","","","","","","","","","",""],
                 ["-","Toyo Harada", "Harbinger Foundation","asdasdads","","","","","","","","","",""],
                 ["Bloodshot","Ray Garrison","Project Rising Spirit","asdasdads","","","","","","","","","",""],
                 ["Ninjak","Colin King", "MI-6","asdasdads","","","","","","","","","",""],
                 ["Eternal Warrior","Gilad Anni-Padda", "MI-6","asdasdads","","","","","","","","","",""],
                 ["X-O Manowar","Aric of Dacia","MI-6","asdasdads","","","","","","","","","",""],
                 ["Liveware","Amanda McKee", "MI-6","asdasdads","","","","","","","","","",""],
                 ["Mech Mayor","Sunlight on Snow","Harbinger Foundation","asdasdads","","","","","","","","","",""]
            ];
    
        
        var table = $('#supsTable').DataTable({
                "info": false,
                "data": dataSet,
                "scrollX":        true,
                "scrollCollapse": true,
                "searching":      false,
                "paging":         false,
                "fixedColumns":   {
                    leftColumns: 2
                }

        });

      angular.element(document).ready(function () {
          $.fn.dataTable
                  .tables( { visible: true, api: true } )
                  .columns.adjust()
                  .fixedColumns().relayout();
      });

    //};
  }
});
