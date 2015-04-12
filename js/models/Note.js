Zenefits.add('Model', 'Note', function(){

    /**
     * Wrap a callback function so it is called with a Note instance instead of a JS object
     * @param callback (Function) The callback function to wrap
     * @returns {Function}
     * @private
     */
    var _wrapCallback = function(callback) {
        if (!callback) return;
        return function(data) {
            callback(data ? new Note(data) : null);
        }
    };
    /**
     * Identical to the above function execpt for callbacks that deal with an array of items instead of a single item.
     * @param callback * @param callback (Function) The callback function to wrap
     * @returns {Function}
     * @private
     */
    var _wrapListCallback = function(callback){
        if (!callback) return;
        return function(data) {
            callback(data.map(function(item){
                return item ? new Note(item) : null;
            }));
        }
    };

    /**
     * Method to create and persist a new note. Mimics async request
     * @param opts (Object) Must contain at least a 'note' object but should also have a 'success' callback
     */
    this.createNote = function createNote(opts) {
        if (!opts.note) return;
        Zenefits.api.post(opts.note, _wrapCallback(opts.success));
    };

    /**
     * Method to get a note out of data store. Mimics async request
     * @param opts (Object) Must contain an 'id' and optionally a 'success' callback
     */
    this.getNote = function(opts) {
        opts.id ? Zenefits.api.get(opts.id, _wrapCallback(opts.success)) : Zenefits.api.getAll(_wrapListCallback(opts.success));
    };

    /**
     * Method to remove a note out of data store. Mimics async request
     * @param opts (Object) Must contain an 'id' and optionally a 'success' callback
     * @param opts
     */
    this.removeNote = function(opts) {
        if (!opts.id) return;
        Zenefits.api.delete(opts.id, opts.success);
    };

    /**
     * Constructor function for the Note class.
     * @param data (Object) all of the data for the note (title, text, id)
     * @constructor
     */
    function Note(data) {
        this.data = data;
        this.id = data.id;
        this.edit = function(opts) {
            Zenefits.api.put(opts.data.id, opts.data, _wrapCallback(opts.success));
        };
    }
});