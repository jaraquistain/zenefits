/**
 * This is the namespace Class used for the app. Other entities can be added to the namespace. Since this is
 * a coding exercise it is very simple and does not handle dependencies or inheritance/polymorphism like it should
 * @constructor
 */
function Zenefits(){
    /////////////////
    //PUBLIC METHODS
    /////////////////
    /**
     * Add an entity into our namespace.
     * @param type (String, required) the type of entity we are adding. Typical values are "Class", "Controller", "Directive", etc.
     * @param name (String, required) the name of the entity being added
     * @param constructor (Function, required) the constructor function for each entity being added
     * @returns {Zenefits}
     */
    this.add = function(type, name, constructor){
        if (!type || !name || !constructor) {
            console.error('cannot add ' + (type || 'entity') +  ': ' + (name || 'unknown') + ' into namespace. Invalid arguments');
            return this;
        }
        this[type] = this[type] || {};
        this[type][name] = type === 'Class' ? constructor : new constructor;
        return this;
    };
}

//Add instance of namespace to window for easy access
window.Zenefits = new Zenefits;