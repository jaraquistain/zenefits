/**
 * This is the namespace Class used for the app. Other entities can be added to the namespace. Since this is
 * a coding exercise it is very simple and does not handle dependencies or inheritance/polymorphism like it should
 * @constructor
 */
function Zenefits(){

    //PUBLIC METHODS
    /**
     * Add an entity into our namespace.
     * @param type (String, required) the type of entity we are adding. Typical values are "Class", "Controller", "Directive", etc.
     * @param name (String, required) the name of the entity being added
     * @param entity (Function or Object, required) the constructor function for each entity being added, or an instance of an angular entity
     * @returns {Zenefits}
     */
    this.add = function(type, name, entity){
        if (!type || !name || !constructor) {
            console.warn('cannot add entity to namespace. Invalid arguments');
            return;
        }
        this[type] = this[type] || {};
        this[type][name] = constructor;
        return this;
    };
}

window.Zenefits = new Zenefits();