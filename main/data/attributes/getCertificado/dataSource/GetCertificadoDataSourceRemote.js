const getCertificadoRemote = require('../source/GetCertificadoRemote');
const { URL_BASE,HEADERS } = require('../../../config/remote/APIs');

module.exports = class getCertificadoDataSourceRemote {
  static instance;
  constructor () {
    if (getCertificadoDataSourceRemote.instance) {
      return getCertificadoDataSourceRemote.instance;
    } else {
        getCertificadoDataSourceRemote.instance = this;
    }
  }
getCertificado(infoSession, infoUser) {
    return getCertificadoRemote.getCertificado(HEADERS,URL_BASE.BACK_SERVICE_M3, infoSession, infoUser);
  }
} 