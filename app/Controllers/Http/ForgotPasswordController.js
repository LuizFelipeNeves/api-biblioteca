'use strict';

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    const email = request.input('email')

    if (!email) {
      return response.status(404).send({
        error: { message: 'Informe o campo: email' }
      })
    }

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

  async update ({ request, response }) {
    const { token, password } = request.all()

    if (!token || !password) {
      return response.status(404).send({
        error: { message: 'Informe o campo: token e email.' }
      })
    }

    const user = await User.findBy('token', token)

    if (user) {
      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (!tokenExpired) {
        user.token = null
        user.token_created_at = null
        user.password = password
        await user.save()

        return response.status(200).send({
          message: 'Senha alterada com sucesso!'
        })
      } else {
        return response.status(401).send({
          error: { message: 'O token de recuperação está expirado' }
        })
      }
    } else {
      return response.status(404).send({
        error: { message: 'Algo não deu certo, esse token existe?' }
      })
    }
  }
}

module.exports = ForgotPasswordController
