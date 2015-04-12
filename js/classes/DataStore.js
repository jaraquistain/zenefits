//This Class exists as a browser polyfill for LocalStorage it probably won't be used in most cases
Zenefits.add('Class', 'DataStore', function DataStore(){
    /////////////////
    //PRIVATE VARS
    /////////////////
    //Initialize the data store in memory;
    var _store = {};

    /////////////////
    //PUBLIC METHODS
    /////////////////
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
     * @returns {DataStore}
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