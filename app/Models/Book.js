const Model = use('Model');

class Book extends Model {
  static boot() {
    super.boot();

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'title',
      },
      strategy: 'dbIncrement',
    });
  }
}

module.exports = Book;
