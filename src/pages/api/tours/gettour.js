import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const {id} = req.body
  res.json(await Tour.findById(id))
}

export default connectDB(handler)
