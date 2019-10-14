'use strict';

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    return auth.attempt(email, password)
  }
}

module.exports = SessionController
