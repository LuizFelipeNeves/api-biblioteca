/* eslint-disable class-methods-use-this */
const Model = use('Model');
const Env = use('Env');

class File extends Model {
  static get computed() {
    return ['url'];
  }

  getUrl({ file }) {
    return `${Env.get('APP_URL')}/files/${file}`;
  }
}

module.exports = File;
