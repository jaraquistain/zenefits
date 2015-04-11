Zenefits.add('Controller','NoteController', (new function NoteController(){
    this.controller = function($scope, $routeParams){
        console.log('note controller for:', $routeParams.id);
    };
    this.controller.$inject = ['$scope', '$routeParams'];
}()));
