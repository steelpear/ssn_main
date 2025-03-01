import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  const response = await SetOfTour.find({slug: req.body}, {slug: 1})
  if (response.length > 0) {res.json({state: true})} else {res.json({state: false})}
}

export default connectDB(handler)
