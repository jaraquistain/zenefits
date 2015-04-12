Zenefits.add('Controller', 'CreateController', function CreateController() {
    this.controller = function ($scope, $location) {
        $scope.note = {};
        $scope.save = function save() {
            $scope.submitted = true;
            $scope.noteForm.$valid && Zenefits.Model.Note.createNote({
                'note':    $scope.note.data,
                'success': function (note) {
                    $location.path('/');
                }
            });
        };

        $scope.cancel = function cancel() {
            $location.path('/');
        };
    };
    this.controller.$inject = ['$scope', '$location'];
});
