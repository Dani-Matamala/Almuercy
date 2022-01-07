const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Orders = mongoose.model('order', new Schema({
    meal_id: {type: Schema.Types.ObjectId, ref: 'Meal'}, //clave foranea
    user_id: String,
}))

module.exports = Orders