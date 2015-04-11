Zenefits.add('DataStore', function(){
    var store = {};
    return {
        'getItem': function(key) {
            return store[key];
        },
        'setItem': function(key,value) {
            store[key] = value;
            return this;
        }
    }
});