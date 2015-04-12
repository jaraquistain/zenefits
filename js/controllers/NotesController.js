Zenefits.add('Controller','NotesController', function NotesController(){
    this.controller = function($scope){
        Zenefits.Model.Note.getNote({
            'success': function(notes) {
                $scope.notes = notes;
            }
        });

        $scope.remove = function(id, index) {
            var confirm = window.confirm("Are you sure you want to delete this note?");
            confirm && Zenefits.Model.Note.removeNote({
                'id': id,
                'success': function(){
                    $scope.notes.splice(index,1);
                }
            })
        };
    };
    this.controller.$inject = ['$scope'];
});
