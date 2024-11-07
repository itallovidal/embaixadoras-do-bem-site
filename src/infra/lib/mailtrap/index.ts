import Nodemailer from 'nodemailer'
// import { env } from '@/root/env'

export class MailtrapSender {
  private emailName = 'embaixadorasdobem.site@gmail.com'

  private SENDER_EMAIL = this.emailName
  private RECIPIENT_EMAIL = this.emailName
  private transport = Nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: 'api',
      pass: '18426776bbd9edcac61d4211da159e01',
    },
  })

  async sendEmail(volunteer: IVolunteer) {
    const mailData = {
      from: {
        address: 'hello@demomailtrap.com',
        name: 'Formulário do Site',
      },
      to: this.RECIPIENT_EMAIL,
      subject: 'Novo Voluntário!',
      text: 'Veja aqui suas novas informações.',
      html: `
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block" class="email-container">
      <h1>Novo Voluntariado!</h1>
      <p>Olá, equipe da Embaixadoras do Bem,</p>
      <p>Gostaríamos de informar que temos uma nova oportunidade de voluntariado disponível. ${volunteer.name} é ${volunteer.profession}, e pode ser de grande ajuda.</p>

      <h2>Suas Informações:</h2>
      <ul>
          <li>Nome: ${volunteer.name}</li>
          <li>Email: ${volunteer.email}</li>
          <li>Telefone: ${volunteer.phone}</li>
          <li>Profissão: ${volunteer.profession}</li>
      </ul>
      <span>-- <br> <br></span>

      <span>Essas informações vieram diretamente do formulário do site.</span>
    </div>
    <style>
      span{
        font-style: italic;
      }
      p{
        line-height: 26px;
      }
      h1, h2{
        color: #FF64C3;
        font-size: 24px; 
        font-weight: bold; 
        margin-top: 20px;
      }

      h2{
        font-size: 18px; 
      }
      .email-container{
        margin: auto;
        max-width: 600px;
        padding: 16px;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      ul li{ margin-block: 12px }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>
        `,
    }

    try {
      await this.transport.sendMail(mailData)
      console.log('email enviado!')
    } catch (err) {
      console.log(err)
    }
  }
}
