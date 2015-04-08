function Zenefits(opts){
    return {
        'classes': {},
        'addClass': function(name, constructor){
            this.classes[name] = constructor;
        }
    }
}

window.Zenefits = new Zenefits();