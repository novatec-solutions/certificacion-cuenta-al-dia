const GetCertificadoDataSourceRemote = require('../dataSource/GetCertificadoDataSourceRemote');
const GetCertificadoDataSourceLocal = require('../dataSource/GetCertificadoDataSourceLocal'); 
const getCertificadoDataSourceRemote = new GetCertificadoDataSourceRemote();
const getCertificadoDatasourceLocal = new GetCertificadoDataSourceLocal();


module.exports = class GetCertificadoRepository {
  static instance;
  constructor () {
    if (GetCertificadoRepository.instance) {
      return GetCertificadoRepository.instance;
    } else {
      GetCertificadoRepository.instance = this;
    }
  }
  checkgetCertificadoRemote(infoSession, infoUser) {
    return getCertificadoDataSourceRemote.getCertificado(infoSession, infoUser);
  }

  creategetCertificado(response){
    return getCertificadoDatasourceLocal.creategetCertificado(response);
  }
}