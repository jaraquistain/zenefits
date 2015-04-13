Zenefits.add('Class', 'Api', function Api() {
    /////////////////
    //PRIVATE VARS
    /////////////////
    var _db          = window.localStorage || new Zenefits.Class.DataStore,
        NOTE_KEY     = '_NOTES',
        currentNotes = _db.getItem(NOTE_KEY);

    /////////////////
    //PRIVATE METHODS
    /////////////////
    /**
     * Initializes the Class
     * @private
     */
    var _init = function () {
        //Initialize the notes list
        _db.setItem(NOTE_KEY, currentNotes || JSON.stringify([]));
    };

    /**
     * Generates a random string. Checks data store for uniqueness and
     *   retries until a unique string is generated
     * @param n (Number) length of ID to be generated
     * @private
     */
    var _generateID = function (n) {
        n = n || 8;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
            guid  = '';

        for (var i = 0; i < n; i++) {
            guid += chars[Math.floor(Math.random() * chars.length)];
        }

        return _db.getItem(guid) ? _generateID(n) : guid;
    };

    /////////////////
    //PUBLIC METHODS
    /////////////////
    /**
     * Gets a list of all note items in the data store
     * @param callback (Function) the callback to be executed when finished
     * @returns {Api}
     */
    this.getAll = function (callback) {
        var items = JSON.parse(_db.getItem(NOTE_KEY)),
            notes = [],
            me = this;
        items.forEach(function(id){
            me.get(id, function(item){
                notes.push(item);
            });
        });
        callback(notes);
        return this
    };

    /**
     * Get a single note from the data store
     * @param id       (String)   The id of the note to be fetched
     * @param callback (Function) The callback to be executed when finished
     * @returns {Api}
     */
    this.get = function (id, callback) {
        var item = _db.getItem(id);
        item = item ? JSON.parse(item) : null;

        //Remove internal index reference
        if (item) delete item._index;

        callback(item);
        return this;
    };

    /**
     * Create a new note in the data store
     * @param note     (Object)   The data for the note to be created
     * @param callback (Function) The callback to be executed when finished
     * @returns {Api}
     */
    this.post = function (note, callback) {
        if (!note) {
            console.warn('A note object is required');
            return this
        }

        var notes = JSON.parse(_db.getItem(NOTE_KEY));
        note._index = notes.length;
        note.id = _generateID();

        notes.push(note.id);

        _db.setItem(NOTE_KEY, JSON.stringify(notes));
        _db.setItem(note.id, JSON.stringify(note));

        delete note._index;
        callback(note);
        return this;
    };

    /**
     *
     * @param id       (String)   The ID of the note being updated
     * @param note     (Object)   The new data for the existing note
     * @param callback (Function) The callback to be executed when finished
     * @param extend   (Boolean)  Whether or not new data should extend or replace old data
     * @returns {Api}
     */
    this.put = function (id, note, callback, extend) {
        var old = JSON.parse(_db.getItem(id));
        if (!note || !id || !old) {
            !note && console.warn('You must provide new note data');
            !id && console.warn('You must provide a note id to update');
            id && !old && console.warn('Note ' + id + ' does not exist.');
            return this
        }

        var notes   = JSON.parse(_db.getItem(NOTE_KEY)),
            index   = old._index,
            newNote = angular.extend((extend ? old : {'_index': index, 'id': id}), note);

        _db.setItem(id, JSON.stringify(newNote));
        _db.setItem(NOTE_KEY, JSON.stringify(notes));

        delete newNote._index;
        callback(newNote);
        return this;
    };
    /**
     * Same as PUT except it extends the existing data rather than replacing it
     * @param id       (String)   The ID of the note being updated
     * @param note     (Object)   The new data for the existing note
     * @param callback (Function) The callback to be executed when finished
     * @returns {Api}
     */
    this.patch = function (id, note, callback) {
        return this.put(id, note, callback, true);
    };

    /**
     * Remove a note out of the data store.
     * @param id       (String)   The ID of the note being removed
     * @param callback (Function) The callback to be executed when finished
     * @returns {Api}
     */
    this.delete = function (id, callback) {
        var notes = JSON.parse(_db.getItem(NOTE_KEY)),
            old   = JSON.parse(_db.getItem(id)),
            index = old._index,
            note;

        for (var i = index + 1; i < notes.length; i++) {
            note = JSON.parse(_db.getItem(notes[i]));
            note._index -= 1;
            _db.setItem(note.id, JSON.stringify(note));
        }

        //remove item out of notes array
        notes.splice(index, 1);
        //remove item out of data store
        _db.removeItem(id);

        //set new notes array
        _db.setItem(NOTE_KEY, JSON.stringify(notes));
        callback();
        return this;
    };

    /////////////////
    //INIT INSTANCE
    /////////////////
    _init();
});

//Add an instance of this as a namespace property for easy access
Zenefits.api = new Zenefits.Class.Api;