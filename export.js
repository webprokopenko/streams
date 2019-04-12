class Export1 {
    constructor(){
        this._name = "Start name";
    }
    get name(){
        return this._name;
    }
    set name(new_name){
        this._name = new_name
    }
}

class Export2 {
    constructor(){
        console.log('Export2');
    }
}

class Export3 {
    constructor(){
        console.log('Export3');
    }
}

module.exports = {
    Export1 : Export1,
    Export2 : Export2,
    Export3 : Export3
}