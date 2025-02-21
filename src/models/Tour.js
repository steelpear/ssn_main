import { Schema, model, models } from 'mongoose'

const Tour = new Schema({
  img: Array,
  name: String,
  slug: String,
  description: String,
  region: String,
  Important: String,
  included: String,
  price: String,
  dprice: String,
  program: String,
  booking: String,
  utp: Array,
  public: Boolean
}, { collection: 'tours' })

module.exports = models.Tour || model('Tour', Tour)
