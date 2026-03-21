import nodemailer from 'nodemailer'
import { env } from '../../env'

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
})

const mail = {
  send: async (to: string, subject: string, text: string) => {
    try {
      const info = await transporter.sendMail({
        from: env.EMAIL_USER,
        to,
        subject,
        text,      })
      console.log('Email sent: %s', info.messageId)
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error('Failed to send email')
    }
  }
}

export { mail }
