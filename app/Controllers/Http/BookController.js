/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

const Book = use('App/Models/Book');
const Database = use('Database');

class BookController {
  async query({ request }) {
    // title regex
    const data = request.only('author', 'category');
    const perPage = request.input('perPage') || 5;
    const page = request.input('page') || 1;
    return Database.table('books')
      .where(data)
      .paginate(perPage, page);
  }

  async find({ params }) {
    const { slug } = params;
    if (!slug) throw Error('Insira o slug');
    const book = await Book.findBy('slug', slug);
    if (!book) throw Error('Livro não encontrado');
    return book;
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        'title',
        'description',
        'author',
        'category',
        'image',
      ]);
      return Book.create(data);
    } catch (error) {
      return response.status(404).send([{ message: error }]);
    }
  }
}

module.exports = BookController;
