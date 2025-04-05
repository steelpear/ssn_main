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
  date: Date,
  html_title: String,
  meta_description: String,
  main_page: Boolean,
  public: Boolean
}, { collection: 'blog' })

module.exports = models.Article || model('Article', Article)
