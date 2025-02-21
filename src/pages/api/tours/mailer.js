const fs = require('fs')
const nodemailer = require('nodemailer')

const mailer = async (req, res) => {
  fs.readFile('configmail.config', 'utf8', (err, data) => {
    // eslint-disable-next-line no-console
    if (err) { console.error(err) }
    const mailConfig = JSON.parse(data)
    const transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass
      }
    })
    const mailOptions = {
      from: 'Бронирование тура на сайте pro100tur.ru <steelpear@yandex.ru>',
      to: mailConfig.to,
      subject: 'Бронирование тура',
      text: req.body.text
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // eslint-disable-next-line no-console
        return console.log(error.message)
      }
      // eslint-disable-next-line no-console
      console.log('Message sent: %s', info.messageId)
    })
  })
  res.json({ state: 'success' })}

export default mailer
