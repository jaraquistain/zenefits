Zenefits.add('Controller','EditController', (new function EditController(){
    this.controller = function($scope, $routeParams){
        console.log('edit controller for:', $routeParams.id);
    };
    this.controller.$inject = ['$scope', '$routeParams'];
}()));
