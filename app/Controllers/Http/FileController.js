"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");

class FileController {
  async show({ params, response }) {
    const file = await File.findBy("file", params.name);
    if (file) return response.download(Helpers.tmpPath(`uploads/${file.file}`));
    return response.status(404).send([
      {
        messsage: "This file don`t exist in database",
        field: "name",
        validation: "required"
      }
    ]);
  }

  /**
   * Create/save a new file.
   * POST files
   */
  async store({ request, response }) {
    try {
      if (!request.file("file")) return;

      const upload = request.file("file", { size: "2mb" });
      const { subtype, clientName, type } = upload;

      const fileName = `${Date.now()}.${subtype}`;
      await upload.move(Helpers.tmpPath("uploads"), {
        name: fileName
        // overwrite: true
      });

      if (!upload.moved()) throw upload.error();

      return File.create({
        file: fileName,
        name: clientName,
        type,
        subtype
      });
    } catch (error) {
      return response
        .status(error.status)
        .send([{ messsage: "Error on upload of file" }]);
    }
  }
}

module.exports = FileController;
