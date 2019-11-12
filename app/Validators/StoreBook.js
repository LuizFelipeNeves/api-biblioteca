"use strict";

class StoreBook {
  get rules() {
    return {
      title: "required",
      description: "required",
      isbn: "required|unique:books,isbn",
      year: "required",
      edition: "required",
      pages: "required",
      country: "required"
    };
  }
  get messages() {
    return {
      "title.required": "You must provide a title.",
      "description.required": "You must provide a description",
      "isbn.required": "You must provide a isbn number",
      "isbn.unique": "This isbn is already registered.",
      "year.required": "You must provide a year of edition",
      "edition.required": "You must provide a edition number",
      "pages.required": "You must provide a pages number",
      "country.required": "You must provide a country"
    };
  }
  validateAll = () => true;
  fails = async errorMessages => this.ctx.response.send(errorMessages);
}

module.exports = StoreBook;
