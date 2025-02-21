import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  await Tour.findByIdAndDelete(req.body.id)
  res.json({ state: true })
}

export default connectDB(handler)
