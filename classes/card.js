export default class {
    constructor(zone) {
        this.name = this.constructor.name;
        this.power = this.constructor.power;
        this.toughness = this.constructor.toughness;
    }
    
    move(index, destination, bottom = false) {
        
    }

    tap() { this.isTapped = true; }
    untap() { this.isTapped = false; }
    
    resolve() {}
}
