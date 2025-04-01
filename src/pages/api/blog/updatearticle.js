import connectDB from '../../../middleware/mongodb'
import Article from '../../../models/Article'

const handler = async (req, res) => {
  const { id, data } = req.body
  const response = await Article.findByIdAndUpdate(id, data)
  if (response) {res.send({state: true})} else {res.send({state: false})}
}

export default connectDB(handler)
