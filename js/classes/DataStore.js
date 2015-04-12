//This Class exists as a browser polyfill for LocalStorage
Zenefits.add('Class', 'DataStore', function(){
    //Initialize the data store in memory;
    var _store = {};

    /**
     * Get an item within the data store and return it
     * @param key (String) the key to fetch from the store
     * @returns {*}
     */
    this.getItem = function getItem(key) {
        return _store[key];
    };

    /**
     * Set an value within the data store
     * @param key (String) the key to set
     * @param value (String) the value to set
     * @returns {*}
     */
    this.setItem = function setItem(key, value) {
        _store[key] = value;
        return this;
    };

    /**
     * Remove an item within the data store
     * @param key (String) the key to be removed
     */
    this.removeItem = function(key) {
        delete _store[key];
    }
});