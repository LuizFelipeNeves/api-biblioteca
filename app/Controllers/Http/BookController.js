"use strict";

const Book = use("App/Models/Book");

class BookController {
  /**
   * Show a list of all books.
   * GET books
   */
  async index({ response }) {
    return Book.all();
  }

  /**
   * Show a list of books with filter.
   *  books
   */
  async filter({ request, response }) {
    return Book.all();
  }

  /**
   * Display a single book.
   * GET books/:id
   */
  async show({ params, response }) {
    try {
      const data = await Book.findBy("id", params.id);
      return data
        ? data
        : response.status(404).send([
            {
              message: "This book don`t exist in database",
              field: "id",
              validation: "required"
            }
          ]);
    } catch (error) {
      return response.status(500).json([
        {
          message: "You must provide a id.",
          field: "id",
          validation: "required"
        }
      ]);
    }
  }

  /**
   * Create/save a new book.
   * POST books
   */
  async store({ request, response }) {
    // TODO: Verificar se é admin
    const data = request.collect([
      "title",
      "description",
      "isbn",
      "year",
      "edition",
      "pages",
      "country",
      "status"
    ]);
    return Book.create(data);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   */
  async update({ params, request, response }) {
    const id = params.input("id");
    if (!id) {
      return response
        .status(404)
        .send([{ message: "Informe o parametro: id" }]);
    }

    const book = await Book.findBy("id", id);

    // TODO: Verificar se é admin
    const data = request.only([
      "title",
      "description",
      "year",
      "edition",
      "pages",
      "coutry",
      "status"
    ]);
    book.fill(data);
    await book.save();
    return response.json(book);
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   */
  async destroy({ params, response }) {
    const id = params.input("id");
    if (!id)
      return response.status(500).json([
        {
          message: "You must provide a id.",
          field: "id",
          validation: "required"
        }
      ]);

    const book = await Book.findBy("id", id);
    if (!book)
      return response.status(404).send([
        {
          message: "This book don`t exist in database",
          field: "id",
          validation: "required"
        }
      ]);

    // TODO: Verificar se é admin
    await book.delete();
    return response.status(200).send([
      {
        message: "Livro apagado com sucesso!"
      }
    ]);
  }
}

module.exports = BookController;
