Zenefits.add('Api', function(){
    var db = window.localStorage || new Zenefits.classes.DataStore,
        _api = this;

    _api.get = function(id){
        var note = db.getItem('notes'),
            match;
        id && note.some(function(item){
            match = item.id === id;
            note = match ? item : note;
            return match;
        });

        return note;
    };

    _api.post = function(item) {
        var notes = db.getItem('notes');
        notes.push(item);
        return notes;
    };

    return _api;
});

Zenefits.api = new Zenefits.classes.Api;