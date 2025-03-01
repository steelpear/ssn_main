import connectDB from '../../../middleware/mongodb'
import Tour from '../../../models/Tour'

const handler = async (req, res) => {
  const response = await Tour.find({slug: req.body}, {slug: 1})
  if (response.length > 0) {res.json({state: true})} else {res.json({state: false})}
}

export default connectDB(handler)
