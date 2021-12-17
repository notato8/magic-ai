export default [
    {
        name: "Blade Instructor",
        cost: {
            mana: {
                generic: 2,
                white: 1
            }
        },
        types: ["Creature"],
        subtypes: ["Human", "Soldier"],
        power: 3,
        toughness: 1,
        abilities: {
            triggered: [
                "Mentor"
            ]
        }
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
