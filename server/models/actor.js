var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const actorSchema = new Schema({
    oldId: String,
    name: String,
    slugName: String,
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
    info: String,
    date: String,
    city: String,
    nominations: [String],
    image: String
});

const Actor = mongoose.model('Actor', actorSchema);
module.exports = Actor;
