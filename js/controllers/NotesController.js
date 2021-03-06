Zenefits.add('Controller','NotesController', function NotesController(){
    this.controller = function($scope){
        /////////////////
        //PRIVATE METHODS
        /////////////////
        /**
         * Init the controller
         * @private
         */
        var _init = function() {
            Zenefits.Model.Note.getNote({
                'success': function(notes) {
                    $scope.notes = notes;
                }
            });
        };

        /////////////////
        //PUBLIC METHODS
        /////////////////
        /**
         * Delete a note
         * @param id
         * @param index
         */
        $scope.remove = function(id, index) {
            var confirm = window.confirm("Are you sure you want to delete this note?");
            confirm && Zenefits.Model.Note.removeNote({
                'id': id,
                'success': function(){
                    $scope.notes.splice(index,1);
                }
            })
        };

        /////////////////
        //INIT INSTANCE
        /////////////////
        _init();
    };
    this.controller.$inject = ['$scope'];
});
