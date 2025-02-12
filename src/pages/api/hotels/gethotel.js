import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const {id} = req.body
  res.json(await Hotel.findById(id))
}

export default connectDB(handler)
