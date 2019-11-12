"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BookSchema extends Schema {
  up() {
    this.create("books", table => {
      table.increments();
      table.string("title", 95).notNullable();
      table.string("description", 255).notNullable();
      table.string("isbn", 16).notNullable();
      table.string("year").notNullable();
      table.string("country", 45).notNullable();
      table.integer("edition").notNullable();
      table.integer("pages").notNullable();
      table
        .boolean("status")
        .defaultTo(1)
        .notNull();
      table.timestamps();
    });
  }

  down() {
    this.drop("books");
  }
}

module.exports = BookSchema;
