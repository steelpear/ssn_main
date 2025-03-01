import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const response = await Hotel.find({public: true, slug: req.body.slug})
  res.json(response)
}

export default connectDB(handler)
