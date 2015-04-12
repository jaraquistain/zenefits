Zenefits.add('Controller', 'CreateController', function CreateController() {
    this.controller = function ($scope, $location) {
        /////////////////
        //PUBLIC VARS
        /////////////////
        $scope.note = {};

        /////////////////
        //PUBLIC METHODS
        /////////////////
        /**
         * Save the new note. Checks for form validity before submitting.
         */
        $scope.save = function save() {
            $scope.submitted = true;
            $scope.noteForm.$valid && Zenefits.Model.Note.createNote({
                'note':    $scope.note.data,
                'success': function (note) {
                    $location.path('/');
                }
            });
        };

        /**
         * Cancel saving the note, return to view all notes
         */
        $scope.cancel = function cancel() {
            $location.path('/');
        };
    };
    this.controller.$inject = ['$scope', '$location'];
});
