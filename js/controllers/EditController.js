Zenefits.add('Controller','EditController', function EditController(){
    this.controller = function($scope, $routeParams, $location){
        Zenefits.Model.Note.getNote({
            'id': $routeParams.id,
            'success': function(note){
                $scope.note = note;
            }
        });

        $scope.save = function save() {
            $scope.submitted = true;

            $scope.noteForm.$valid && $scope.note.edit({
                'data':    $scope.note.data,
                'success': function (note) {
                    $location.path('/note/' + note.id);
                }
            });
        };

        $scope.remove = function(id) {
            var confirm = window.confirm("Are you sure you want to delete this note?");
            confirm && Zenefits.Model.Note.removeNote({
                'id': id,
                'success': function(){
                    $location.path('/');
                }
            })
        };

        $scope.cancel = function cancel() {
            $location.path('/note/' + $scope.note.id);
        };
    };
    this.controller.$inject = ['$scope', '$routeParams', '$location'];
});
