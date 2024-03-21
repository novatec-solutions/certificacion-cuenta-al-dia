const getCertificado = require('../entities/GetCertificado');

module.exports.creategetCertificado = creategetCertificado;
module.exports.clearData = clearData;

function clearData() {
  my.clearStorageSync();
}
/** 
 * Permite la conversion de la respuesta del servicios 
 * a clase de objeto mapeado.
 * @param {any} data es la respuesta del servicio.
 * @returns Objeto mapeado en clase RechazarImei 
 */


function creategetCertificado(response) {
  try {
    const RechazarImei = new getCertificado(response);
    return RechazarImei;

  } catch (error) {
    return false;
  }

}