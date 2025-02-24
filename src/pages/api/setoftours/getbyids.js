import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const response = await Tour.find({_id: {$in: req.body.ids}, public: true}, {'name': 1, 'img': 1})
  res.json(response)
}

export default connectDB(handler)
