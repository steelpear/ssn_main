import connectDB from '../../../middleware/mongodb'
import Hotel from '../../../models/Hotel'

const handler = async (req, res) => {
  const { id, data } = req.body
  const response = await Hotel.findByIdAndUpdate(id, data)
  if (response) {res.send({state: true})} else {res.send({state: false})}
}

export default connectDB(handler)
