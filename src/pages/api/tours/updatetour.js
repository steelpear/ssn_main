import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const { id, data } = req.body
  const response = await Tour.findByIdAndUpdate(id, data)
  if (response) {res.send({state: true})} else {res.send({state: false})}
}

export default connectDB(handler)
