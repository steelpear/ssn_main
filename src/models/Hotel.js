import { Schema, model, models } from 'mongoose'

const Hotel = new Schema({
  img: String,
  name: String,
  url: String,
  description: String,
  price: String,
  info: String,
  type: String,
  city: String,
  rating: String,
  utp: Array,
  public: Boolean
}, { collection: 'hotels' })

module.exports = models.Hotel || model('Hotel', Hotel)
