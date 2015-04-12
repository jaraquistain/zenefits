Zenefits.add('Controller', 'NoteController', function NoteController() {
    this.controller = function ($scope, $routeParams, $location) {
        /////////////////
        //PRIVATE METHODS
        /////////////////
        /**
         * Init the controller
         * @private
         */
        var _init = function() {
            Zenefits.Model.Note.getNote({
                'id':      $routeParams.id,
                'success': function (note) {
                    if (note) {
                        $scope.note = note;
                    } else {
                        $location.path('/');
                    }
                }
            });
        };

        /////////////////
        //INIT INSTANCE
        /////////////////
        _init();
    };
    this.controller.$inject = ['$scope', '$routeParams', '$location'];
});
