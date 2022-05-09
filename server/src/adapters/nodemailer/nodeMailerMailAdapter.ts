import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e0b3283f4fcf1c",
    pass: "bf9ff1bcc198a3"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
      await transport.sendMail({
        from: 'Feedget Teams <hi@feedget.com>',
        to: 'Gabriel Aragão <aragasdev@gmail.com>',
        subject,
        html: body,
      })
  }
}