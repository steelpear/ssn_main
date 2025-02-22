import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  const response = await SetOfTour.find({public: true}).sort({_id:-1})
  res.json(response)
}

export default connectDB(handler)
