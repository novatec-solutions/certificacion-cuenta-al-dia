const getCertificadoLocal = require('../source/GetCertificadoLocal');
const { TYPE } = require('../../../config/local/Keys');

module.exports = class getCertificadoDataSourceLocal {
  static instance;
  constructor () {
    if (getCertificadoDataSourceLocal.instance) {
      return getCertificadoDataSourceLocal.instance
    } else {
      getCertificadoDataSourceLocal.instance = this
    }
  }
  creategetCertificado(response){
    return getCertificadoLocal.creategetCertificado(response);
  }

}