/* eslint-disable no-undef */
const Route = use('Route');

Route.post('users', 'UserController.store');
Route.post('sessions', 'SessionController.store');

Route.post('passwords', 'ForgotPasswordController.store');
Route.put('passwords', 'ForgotPasswordController.update');

Route.get('files/:name', 'FileController.show');
Route.post('files', 'FileController.store');
Route.get('files', 'FileController.filter');

Route.get('books/:slug', 'BookController.find');
Route.get('books', 'BookController.query');

/*
    TODO:
        Validator,
        Create a controller for books,
        Find with database, paginate.
*/
