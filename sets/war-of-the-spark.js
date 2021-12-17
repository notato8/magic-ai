import Card from "../prototypes/card.js";


function KarnTheGreatCreator() {};
function UginTheIneffable() {};
function UginsConjurant() {};
function Plains() {};
function Island() {};
function Swamp() {};
function Mountain() {};
function Forest() {};

const cards = [
    KarnTheGreatCreator,
    UginTheIneffable,
    UginsConjurant,
    Plains,
    Island,
    Swamp,
    Mountain,
    Forest
]


cards.forEach(card => Object.setPrototypeOf(card, Card));

Object.assign(KarnTheGreatCreator.prototype, {
    name: "Karn, the Great Creator",
    cost: { mana: { generic: 4 } },
    supertypes: ["Legendary"],
    types: ["Planeswalker"],
    subtypes: ["Karn"],
    loyalty: 5,
});
Object.assign(UginTheIneffable.prototype, {
    name: "Ugin, the Ineffable",
    cost: { mana: { generic: 6 } },
    supertypes: ["Legendary"],
    types: ["Planeswalker"],
    subtypes: ["Ugin"],
    loyalty: 4,
});
Object.assign(UginsConjurant.prototype, {
    name: "Ugin's Conjurant",
    cost: { mana: { x: 1 } },
    types: ["Creature"],
    subtypes: ["Spirit", "Monk"],
    power: 0,
    toughness: 0
});
Object.assign(Plains.prototype, {
    name: "Plains",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Plains"],
});
Object.assign(Island.prototype, {
    name: "Island",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Island"],
});
Object.assign(Swamp.prototype, {
    name: "Swamp",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Swamp"],
});
Object.assign(Mountain.prototype, {
    name: "Mountain",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Mountain"],
});
Object.assign(Forest.prototype, {
    name: "Forest",
    supertypes: ["Basic"],
    types: ["Land"],
    subtypes: ["Forest"],
});


export default cards;
