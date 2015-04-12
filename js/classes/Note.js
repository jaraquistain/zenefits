Zenefits.add('Model', 'Note', function(){
    var _wrapCallback = function(callback) {
        return function(data) {
            callback(data ? new Note(data) : null);
        }
    };

    var _wrapListCallback = function(callback){
        return function(data) {
            callback(data.map(function(item){
                return item ? new Note(item) : null;
            }));
        }
    };

    this.createNote = function createNote(opts) {
        if (!opts.note) return;
        Zenefits.api.post(opts.note, _wrapCallback(opts.success));
    };

    this.getNote = function(opts) {
        opts.id ? Zenefits.api.get(opts.id, _wrapCallback(opts.success)) : Zenefits.api.getAll(_wrapListCallback(opts.success));
    };

    this.removeNote = function(opts) {
        if (!opts.id) return;
        Zenefits.api.delete(opts.id, opts.success);
    };

    function Note(data) {
        this.data = data;
        this.id = data.id;
        this.edit = function(opts) {
            Zenefits.api.put(opts.data.id, opts.data, _wrapCallback(opts.success));
        };
    }
});