import connectDB from '../../../middleware/mongodb'
import Review from '../../../models/Review'

const handler = async (req, res) => {
  const { id, data } = req.body
  const response = await Review.findByIdAndUpdate(id, data)
  if (response) {res.send({state: true})} else {res.send({state: false})}
}

export default connectDB(handler)
