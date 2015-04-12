Zenefits.add('Controller','EditController', function EditController(){
    this.controller = function($scope, $routeParams, $location){
        /////////////////
        //PRIVATE METHODS
        /////////////////
        /**
         * Init the controller and fetch relevant data from data store
         * @private
         */
        var _init = function() {
            Zenefits.Model.Note.getNote({
                'id': $routeParams.id,
                'success': function(note){
                    $scope.note = note;
                }
            });
        };

        /////////////////
        //PUBLIC METHODS
        /////////////////
        /**
         * Save the changes to the note. Checks for form validity before submitting.
         */
        $scope.save = function save() {
            $scope.submitted = true;

            $scope.noteForm.$valid && $scope.note.edit({
                'data':    $scope.note.data,
                'success': function (note) {
                    $location.path('/note/' + note.id);
                }
            });
        };

        /**
         * Delete a note
         * @param id (String) The ID of the note to be deleted
         */
        $scope.remove = function(id) {
            var confirm = window.confirm("Are you sure you want to delete this note?");
            confirm && Zenefits.Model.Note.removeNote({
                'id': id,
                'success': function(){
                    $location.path('/');
                }
            })
        };

        /**
         * Cancel saving the note, return to view all notes
         */
        $scope.cancel = function cancel() {
            $location.path('/note/' + $scope.note.id);
        };

        /////////////////
        //INIT INSTANCE
        /////////////////
        _init();
    };
    this.controller.$inject = ['$scope', '$routeParams', '$location'];
});
