Zenefits.add('Controller', 'NoteController', function NoteController() {
    this.controller = function ($scope, $routeParams, $location) {
        Zenefits.Model.Note.getNote({
            'id':      $routeParams.id,
            'success': function (note) {
                if (note) {
                    $scope.note = note;
                } else {
                    $location.path('/');
                }
            }
        });
    };
    this.controller.$inject = ['$scope', '$routeParams', '$location'];
});
