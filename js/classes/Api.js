Zenefits.add('Class', 'Api', function () {
    /////////////////
    //PRIVATE VARS
    /////////////////
    var _db          = window.localStorage || new Zenefits.classes.DataStore,
        NOTE_KEY     = '_NOTES',
        currentNotes = _db.getItem(NOTE_KEY);

    /////////////////
    //PRIVATE METHODS
    /////////////////
    var _init = function () {
        //Initialize the notes list
        _db.setItem(NOTE_KEY, currentNotes || JSON.stringify([]));
    };

    var _generateID = function (n) {
        n = n || 8;
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
            guid  = '';

        for (var i = 0; i < n; i++) {
            guid += chars[Math.floor(Math.random() * chars.length)];
        }

        //check to make sure the id is actually unique, if it isn't recurse until we get one that is.
        return _db.getItem(guid) ? _generateID(n) : guid;
    };

    /////////////////
    //PUBLIC METHODS
    /////////////////
    this.getAll = function (callback) {
        var items = JSON.parse(_db.getItem(NOTE_KEY));
        callback(items.map(function (item) {
            delete item._index;
            return item;
        }));
        return this
    };

    this.get = function (id, callback) {
        var item = _db.getItem(id);
        item = item ? JSON.parse(item) : null;

        //Remove internal index reference
        if (item) delete item._index;

        callback(item);
        return this;
    };

    this.post = function (note, callback) {
        if (!note) {
            console.warn('A note object is required');
            return this
        }

        var notes = JSON.parse(_db.getItem(NOTE_KEY));
        note._index = notes.length;
        note.id = _generateID();

        notes.push(note);

        _db.setItem(NOTE_KEY, JSON.stringify(notes));
        _db.setItem(note.id, JSON.stringify(note));

        delete note._index;
        callback(note);
        return this;
    };

    this.put = function (id, note, callback, extend) {
        if (!note || !id) {
            console.warn('A note and an id is required');
            return this
        }
        var notes   = JSON.parse(_db.getItem(NOTE_KEY)),
            old     = JSON.parse(_db.getItem(id)),
            index   = old._index,
            newNote = angular.extend((extend ? old : {'_index': index, 'id': id}), note);

        notes[index] = newNote;

        _db.setItem(id, JSON.stringify(newNote));
        _db.setItem(NOTE_KEY, JSON.stringify(notes));

        delete newNote._index;
        callback(newNote);
        return this;
    };

    this.patch = function (id, note, callback) {
        return this.put(id, note, callback, true);
    };

    this.delete = function (id, callback) {
        var notes = JSON.parse(_db.getItem(NOTE_KEY)),
            old   = JSON.parse(_db.getItem(id)),
            index = old._index,
            note;

        for (var i = index + 1; i < notes.length; i++) {
            note = notes[i];
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

    _init();
});

Zenefits.api = new Zenefits.Class.Api;