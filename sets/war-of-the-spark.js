export default [
    {
        name: "Karn, the Great Creator",
        cost: {
            mana: {
                generic: 4
            }
        },
        supertypes: ["Legendary"],
        types: ["Planeswalker"],
        subtypes: ["Karn"],
        loyalty: 5,
        abilities: {
            activated: [
                {
                    cost: {
                        loyalty: 1
                    },
                    effect: () => {
                    
                    }
                },
                {
                    cost: {
                        loyalty: -2
                    },
                    effect: () => {
                    
                    }
                }

            ],
            static: [
                
            ]
        },
    },
    {
        name: "Ugin, the Ineffable",
        cost: {
            mana: {
                generic: 6
            }
        },
        supertypes: ["Legendary"],
        types: ["Planeswalker"],
        subtypes: ["Ugin"],
        loyalty: 4,
        abilities: {
            activated: [
                {
                    cost: {
                        loyalty: 1
                    },
                    effect: () => {
                    
                    }
                },
                {
                    cost: {
                        loyalty: -3
                    },
                    effect: () => {
                    
                    }
                }
            ]
        }
    },
    {
        name: "Ugin's Conjurant",
        cost: {
            mana: {
                x: 1
            }
        },
        types: ["Creature"],
        subtypes: ["Spirit", "Monk"],
        power: 0,
        toughness: 0
    },
    {
        name: "Plains",
        supertypes: ["Basic"],
        types: ["Land"],
        subtypes: ["Plains"],
    },
    {
        name: "Island",
        supertypes: ["Basic"],
        types: ["Land"],
        subtypes: ["Island"],
    },
    {
        name: "Swamp",
        supertypes: ["Basic"],
        types: ["Land"],
        subtypes: ["Swamp"],
    },
    {
        name: "Mountain",
        supertypes: ["Basic"],
        types: ["Land"],
        subtypes: ["Mountain"],
    },
    {
        name: "Forest",
        supertypes: ["Basic"],
        types: ["Land"],
        subtypes: ["Forest"],
    }
]
