angular.module('FilesCtrl',[]).controller('FilesController',function($scope,FilesService) {
    $scope.getData = function(){
        FilesService.get.then(function(data){
            console.log(data)
            $scope.files = data.files;
        });
    };
    $scope.getData();
});