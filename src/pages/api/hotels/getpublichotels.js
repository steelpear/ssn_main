import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const response = await Hotel.find({public: true}).sort({_id:-1})
  res.json(response)
}

export default connectDB(handler)
