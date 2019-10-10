'use strict';

const User = use('App/Models/User')

class UserController {
  async store ({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password'])
      const user = await User.create(data)
      return user
    } catch (error) {
      return response.status(404).send({
        error: { message: 'E-mail ou username já cadastrado!' }
      })
    }
  }
}

module.exports = UserController
