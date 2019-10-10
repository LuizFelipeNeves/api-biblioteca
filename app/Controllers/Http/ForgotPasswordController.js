'use strict';

const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (user) {
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      const url = request.input('redirect_url')
      if (!url) {
        return response.status(404).send({
          error: {
            message:
              'Insira a rota de redirecionamento do usuário: redirect_url'
          }
        })
      }

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${url}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('luiz@gmail.com', 'Luiz Felipe Neves')
            .subject('Recuperação de senha | Biblioteca')
        }
      )

      return response.status(200).send({
        message: 'Solicitação enviada com sucesso!'
      })
    } else {
      return response.status(404).send({
        error: { message: 'Algo não deu certo, esse e-mail existe?' }
      })
    }
  }
}

module.exports = ForgotPasswordController
