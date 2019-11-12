/* eslint-disable class-methods-use-this */
class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();
    return auth.attempt(email, password);
  }
}

module.exports = SessionController;
