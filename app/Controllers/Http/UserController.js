"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    try {
      const data = request.collect([
        "full_name",
        "ra",
        "email",
        "password"
      ]);
      return User.create(data);
    } catch (error) {
      return response
        .status(404)
        .send([{ message: "This e-mail or ra already registered!" }]);
    }
  }
}

module.exports = UserController;
