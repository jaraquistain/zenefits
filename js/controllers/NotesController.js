Zenefits.add('Controller','NotesController', (new function NotesController(){
    this.controller = function($scope){
        $scope.foo = 'bar';
    };
    this.controller.$inject = ['$scope'];
}()));
