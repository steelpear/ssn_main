import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  await SetOfTour.findByIdAndDelete(req.body.id)
  res.json({ state: true })
}

export default connectDB(handler)
