Zenefits.add('Class','Module', function App(opts){
    //ANGULAR MODULE
    this.module = angular.module('zenefits', ['ngRoute']);

    //ANGULAR CONTROLLERS
    this.module
        .controller('NotesController', Zenefits.Controller.NotesController.controller)
        .controller('NoteController', Zenefits.Controller.NoteController.controller)
        .controller('EditController', Zenefits.Controller.EditController.controller)
});
Zenefits.angular = new Zenefits.Class.Module;