// Importa los módulos necesarios para interactuar con las capas de datos.
const GetCertificadoRepository = require('../data/attributes/getCertificado/repository/GetCertificadoRepository');
const UserRepository = require('../data/attributes/user/repository/UserRepository');

/** @modulegetCertificadoViewModel */
/**
 * Obtiene los datos de consumo del usuario actual y realiza el procesamiento de los mismos.
 * @returns {Promise<*>} - Devuelve una promesa que se resuelve con los datos de consumo procesados.
 *                         En caso de error, se rechaza con el error correspondiente.
 */
const userRepository = new UserRepository(); // Instancia un objeto UserRepository para interactuar con los datos del usuario.
async function getConsumedData() {
  try {
    // Obtiene la información de la sesión y de la cuenta del usuario.
    const infoSession = userRepository.getInfoSesion();
    const infoUser = userRepository.getAccount();
    // Realiza una solicitud para verificar los datos de consumo remotos.
    const getCertificadoRepository = new GetCertificadoRepository();
    const GetCertificado = await getCertificadoRepository.checkgetCertificadoRemote(infoSession.user, infoUser);
    // Crea un objeto local de datos de consumo a partir de los datos obtenidos.
    const GetCertificadoLocal = getCertificadoRepository.creategetCertificado(GetCertificado);
    return GetCertificadoLocal; // Devuelve el objeto local de datos de consumo.
  } catch (error) {
    return error; // Captura cualquier error y lo devuelve.
  }
}
// Exporta la función para que esté disponible para otros módulos.
module.exports.getConsumedData = getConsumedData;