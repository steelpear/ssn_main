import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const response = await Hotel.find({public: true})
  res.json(response)
}

export default connectDB(handler)
