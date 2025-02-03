const handler = async (req, res) => {
  if (req.body.login === 'ssnadmin' && req.body.password === 'Jnd4F49KlgnF') {
    res.send(true)
  } else {
    res.send(false)
  }
}

export default handler
