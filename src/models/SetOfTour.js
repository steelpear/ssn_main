import { Schema, model, models } from 'mongoose'

const SetOfTour = new Schema({
  img: String,
  name: String,
  slug: String,
  description: String,
  tours: Array,
  public: Boolean
}, { collection: 'setoftours' })

module.exports = models.SetOfTour || model('SetOfTour', SetOfTour)
