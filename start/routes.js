/* eslint-disable no-undef */
const Route = use('Route');

Route.post('users', 'UserController.store');
Route.post('sessions', 'SessionController.store');

Route.post('passwords', 'ForgotPasswordController.store');
Route.put('passwords', 'ForgotPasswordController.update');

Route.get('files/:name', 'FileController.show');
Route.get('files', 'FileController.filter');
Route.post('files', 'FileController.store');

Route.get('books/:slug', 'BookController.find');
Route.get('books', 'BookController.query');
Route.post('books', 'BookController.store');

/*
    TODO:
        Validator
*/
