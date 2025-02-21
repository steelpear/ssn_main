import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const response = await Tour.find().sort({_id:-1})
  res.json(response)
}

export default connectDB(handler)
