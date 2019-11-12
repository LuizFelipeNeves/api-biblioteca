const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('full_name', 80).notNullable();
      table
        .string('email', 254)
        .notNullable()
        .unique();

      table.string('password', 60).notNullable();
      table.string('token');
      table.timestamp('token_created_at');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
