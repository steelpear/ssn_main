import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
  if (req.body.login === 'ssnadmin' && await bcrypt.compare('Jnd4F49KlgnF', req.body.hash)) {
    res.send(true)
  } else {
    res.send(false)
  }
}

export default handler
