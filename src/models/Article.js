import { Schema, model, models } from 'mongoose'

const Article = new Schema({
  img: String,
  title: String,
  short_title: String,
  slug: String,
  announce: String,
  text: String,
  gallery: Array,
  tags: Array,
  date: String,
  html_title: String,
  meta_description: String,
  public: Boolean
}, { collection: 'blog' })

module.exports = models.Article || model('Article', Article)
