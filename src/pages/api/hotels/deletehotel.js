import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  await Hotel.findByIdAndDelete(req.body.id)
  res.json({ state: true })
}

export default connectDB(handler)
