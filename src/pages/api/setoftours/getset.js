import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  const {id} = req.body
  res.json(await SetOfTour.findById(id))
}

export default connectDB(handler)
