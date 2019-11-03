"use strict";

const Route = use("Route");

Route.post("users", "UserController.store"); // TODO: Create a Validator
Route.post("sessions", "SessionController.store"); // TODO: Create a Validator

Route.post("passwords", "ForgotPasswordController.store"); // TODO: Create a Validator
Route.put("passwords", "ForgotPasswordController.update");

Route.get("files/:name", "FileController.show");
Route.post("files", "FileController.store");

Route.get("books/:id", "BookController.show");
Route.put("books/:id", "BookController.update");
Route.delete("books/:id", "BookController.destroy");

Route.get("books", "BookController.index");
Route.post("books", "BookController.store").validator("StoreBook");
