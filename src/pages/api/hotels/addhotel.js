import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const hotel = new Hotel(req.body)
  await hotel.save()
  res.json(hotel._id)
}

export default connectDB(handler)
