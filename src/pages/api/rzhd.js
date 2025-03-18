const handler = async (req, res) => {
  const axios = require('axios')
  const response = await axios.get('https://tripandfly.ru/embedded-portal/embedded.js')
  const resp = await response.data
  res.send(resp)
  }

export default handler
