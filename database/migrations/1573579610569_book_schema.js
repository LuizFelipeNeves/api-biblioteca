/* eslint-disable no-undef */

const Schema = use('Schema');

class BookSchema extends Schema {
  up() {
    this.create('books', (table) => {
      table.increments();
      table.string('title', 90).notNullable();
      table.string('slug');
      table.string('description', 255).notNullable();
      table.string('author', 90).notNullable();
      table.string('category', 20).notNullable();
      table.string('image', 255).notNullable();
      table.timestamp('created_at').defaultTo(this.fn.now());
      table.timestamp('updated_at').defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop('books');
  }
}

module.exports = BookSchema;
