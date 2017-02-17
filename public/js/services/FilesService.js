angular.module('FilesService',[]).factory('FilesService',function($http) {
    return {
        get: (function(response) {
            return $http.get('/api/files')
            .then(function(response) {
              return response.data;
            });
        })()
    };
});
