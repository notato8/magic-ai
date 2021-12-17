import warOfTheSpark from "./war-of-the-spark.js";
import guildsOfRavnica from "./guilds-of-ravnica.js";


export default [
    ...warOfTheSpark,
    ...guildsOfRavnica
].filter((a, index, array) => {
    return index === array.indexOf(array.find(b => {
        return b.prototype.name === a.prototype.name;
    }))
})
