import Card from "../classes/card.js";


export default [
    class extends Card {
        constructor(zone) { super(zone); } //are these necessary?
    
        static name = "Karn, the Great Creator";
        static cost = { mana: { generic: 4 } };
        static supertypes = ["Legendary"];
        static types = ["Planeswalker"];
        static subtypes = ["Karn"];
        static loyalty = 5;
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Ugin, the Ineffable";
        static cost = { mana: { generic: 6 } };
        static supertypes = ["Legendary"];
        static types = ["Planeswalker"];
        static subtypes = ["Ugin"];
        static loyalty = 4;
    },
    class extends Card {
        constructor(zone) { super(zone); }
    
        static name = "Ugin's Conjurant";
        static cost = { mana: { x: 1 } };
        static types = ["Creature"];
        static subtypes = ["Spirit", "Monk"];
        static power = 0;
        static toughness = 0;
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
