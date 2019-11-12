/* eslint-disable class-methods-use-this */

'use strict';

const File = use('App/Models/File');
const Helpers = use('Helpers');

class FileController {
  async show({ params, response }) {
    const { file } = await File.findBy('file', params.name);
    if (file) return response.download(Helpers.tmpPath(`uploads/${file}`));
    return response.status(404).send([{ messsage: 'Arquivo não encontrado' }]);
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const upload = request.file('file', { size: '2mb' });
      if (!upload) {
        return response.status(500).send([{ messsage: 'Insira o arquivo ' }]);
      }
      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName,
        // overwrite: true
      });

      if (!upload.moved()) throw upload.error();

      return File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype,
      });
    } catch (error) {
      return response
        .status(error.status)
        .send([{ messsage: 'Erro no upload de arquivo ' }]);
    }
  }
}

module.exports = FileController;
