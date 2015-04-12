Zenefits.add('Class','Module', function App(){
    //ANGULAR MODULE
    this.module = angular.module('zenefits', ['ngRoute', 'ngSanitize']);

    //ANGULAR ROUTING
    this.module.config(['$routeProvider', '$sceDelegateProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    'templateUrl': '/zn-notes-template.html',
                    'controller': 'NotesController'
                })
                .when('/note/:id', {
                    'templateUrl': '/zn-note-template.html',
                    'controller': 'NoteController'
                })
                .when('/note/:id/edit', {
                    'templateUrl': '/zn-edit-template.html',
                    'controller': 'EditController'
                })
                .when('/create', {
                    'templateUrl': '/zn-edit-template.html',
                    'controller': 'CreateController'
                })
                .otherwise({
                    'redirectTo': '/'
                });
        }]);

    //ANGULAR CONTROLLERS
    this.module
        .controller('NotesController', Zenefits.Controller.NotesController.controller)
        .controller('NoteController', Zenefits.Controller.NoteController.controller)
        .controller('EditController', Zenefits.Controller.EditController.controller)
        .controller('CreateController', Zenefits.Controller.CreateController.controller)
});
Zenefits.angular = new Zenefits.Class.Module;