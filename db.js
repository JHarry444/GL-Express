const { connect, model, Schema } = require("mongoose");


async function connectToMongo() {
    try {
        await connect("mongodb://localhost:27017/cats", { useNewUrlParser: true });
        console.log("DB connection successful");
    } catch (err) {
        console.error(err);
    }
}

connectToMongo();

const catSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    length: Number,
    whiskers: Boolean,
    evil: Boolean
});

module.exports = { catModel: model('cat', catSchema) };