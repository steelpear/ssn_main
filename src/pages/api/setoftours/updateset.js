import connectDB from '../../../middleware/mongodb'
import SetOfTour from '../../../models/SetOfTour'

const handler = async (req, res) => {
  const { id, data } = req.body
  const response = await SetOfTour.findByIdAndUpdate(id, data)
  if (response) {res.send({state: true})} else {res.send({state: false})}
}

export default connectDB(handler)
