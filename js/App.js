Zenefits.add('Class','App', function App(opts){
    console.log('this is called at least');


    //ANGULAR MODULE
    this.module = angular.module('zenefits', []);



    //ANGULAR CONTROLLERS
    this.module.controller('NotesController', Zenefits.Controller.NotesController.controller);

});

//Zenefits.angular = new Zenefits.Class.App;