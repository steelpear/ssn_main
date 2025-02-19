import { Schema, model, models } from 'mongoose'

const Hotel = new Schema({
  img: Array,
  name: String,
  simple_name: String,
  slug: String,
  url: String,
  address: String,
  coord: String,
  description: String,
  actions: String,
  price: String,
  dprice: String,
  label: String,
  type: String,
  city: String,
  rating: String,
  stars: String,
  best: String,
  utp: Array,
  public: Boolean
}, { collection: 'hotels' })

module.exports = models.Hotel || model('Hotel', Hotel)
