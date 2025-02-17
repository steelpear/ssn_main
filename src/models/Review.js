import { Schema, model, models } from 'mongoose'

const Review = new Schema({
  img: String,
  name: String,
  city: String,
  date: String,
  text: String,
  rating: String,
  public: Boolean
}, { collection: 'reviews' })

module.exports = models.Review || model('Review', Review)
