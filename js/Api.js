Zenefits.addClass('Api', function(){
    var db = window.localStorage || new Zenefits.classes.DataStore;

    return {
        'get': function(id){
            var note = db.getItem('notes'),
                match;
            id && note.some(function(item){
                match = item.id === id;
                note = match ? item : note;
                return match;
            });

            return note;
        },
        'post': function(item) {
            var notes = db.getItem('notes');
            notes.push(item);
            return notes;
        }
    }
});

Zenefits.api = new Zenefits.classes.Api;