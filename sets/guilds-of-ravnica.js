import Card from "../classes/card.js";


export default [
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Blade Instructor";
        static cost = { mana: {
            generic: 2,
            white: 1
        } };
        static types = ["Creature"];
        static subtypes = ["Human", "Soldier"];
        static power = 3;
        static toughness = 1;
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Plains";
        static supertypes = ["Basic"];
        static types = ["Land"];
        static subtypes = ["Plains"];
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Island";
        static supertypes = ["Basic"];
        static types = ["Land"];
        static subtypes = ["Island"];
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Swamp";
        static supertypes = ["Basic"];
        static types = ["Land"];
        static subtypes = ["Swamp"];
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Mountain";
        static supertypes = ["Basic"];
        static types = ["Land"];
        static subtypes = ["Mountain"];
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Forest";
        static supertypes = ["Basic"];
        static types = ["Land"];
        static subtypes = ["Forest"];
    }
];
