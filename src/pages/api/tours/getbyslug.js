import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const response = await Tour.find({public: true, slug: req.body.slug})
  res.json(response)
}

export default connectDB(handler)
