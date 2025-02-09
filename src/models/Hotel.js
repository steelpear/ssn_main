import { Schema, model, models } from 'mongoose'

const Hotel = new Schema({
  img: Array,
  name: String,
  url: String,
  description: String,
  price: String,
  dprice: String,
  label: String,
  type: String,
  city: String,
  rating: String,
  utp: Array,
  public: Boolean
}, { collection: 'hotels' })

module.exports = models.Hotel || model('Hotel', Hotel)
