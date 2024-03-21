const {
  HttpError,
  ServiceError,
  IncompleteResponse,
  FunctionalError
} = require("../../error/Error");

/** @module getCertificadoRemote */

/**
 * @description Esta función realiza una solicitud HTTP POST para obtener datos detallados de consumo.
 * @param {string} api - La URL base de la API a la que se realizará la solicitud.
 * @param {object} infoSession - Información de la sesión del usuario (por ejemplo, el profileId).
 * @param {object} infoUser - Información del usuario (por ejemplo, line y token).
 * @returns {Promise} - Una promesa que se resuelve con la respuesta de la solicitud o se rechaza con un error.
 */
async function getCertificado(header, api, infoSession, infoUser, data) {
  try {
    const mock = true;
    if (mock) {
      const dataMock = {
        "error": "0",
        "response": "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",
      };
      const dataMock2 = {
        error: 0,
        response: {
          validacion: "true",
          codigo: "0",
          mensaje: "IMEI no tiene Cesión y la tripleta está registrada"
        }
      };
      return dataMock.response;
    } else {
      const headers = await getHeaders(header, infoUser, infoSession);
      const body = getDataApi(data);
      const response = await my.request({
        url: `${api}/General/CertificadoPagos/GetCertification/`,
        method: "POST",
        headers: headers ? headers : null,
        data: body ? body : null,
        timeout: 50000,
        dataType: "json"
      }).then(resp => {
        const { error, response } = resp.data;
        if (error !== 0) {
          return new ServiceError(response);
        }
        if (!response) {
          return new IncompleteResponse("Void Response");
        }
        return response;
      })
        .catch(e => {
          return new HttpError(e.error);
        });
      return response;
    }
  } catch (e) {
    return new FunctionalError(e.name);
  }
}
/**
 * @description Esta función genera un objeto que contiene los encabezados necesarios para una solicitud HTTP a la API.
 * @param {string} line - Número de línea asociado con la sesión del usuario.
 * @param {string} email - Dirección de correo electrónico del usuario.
 * @param {string} token - Token de sesión del usuario.
 * @returns {object} - Un objeto que contiene los encabezados requeridos para la solicitud HTTP.
 */
async function getHeaders(header, infoUser, infoSession) {
  let sysInfo = await my.getSystemInfo().then(resp => resp);
  return {
    "Content-Type": "application/json; charset=UTF-8",
    "X-MC-MAIL": infoSession.profileId,
    "X-MC-SO": sysInfo.platform ? sysInfo.platform.toLowerCase() : "0",
    "X-MC-DEVICE-ID": header.X_MC_DEVICE_ID,
    "X-MC-USER-AGENT": header.X_MC_USER_AGENT,
    "X-SESSION-ID": infoUser.token,
    "X-MC-LINE": infoUser.line,
    "X-MC-LOB": infoUser.type
  };
}
/**
 * @description Esta función genera un objeto con una estructura específica para ser utilizado como datos en una API.
 * @param {string} line - Número de línea asociado con la sesión del usuario.
 * @returns {object} - Un objeto con la estructura de datos para ser utilizado en una API.
 */
function getDataApi(data) {
  return {
    "data": {
      "numeroDocumento": "1030608306",
      "tipoDocumentoNumerico": "1",
      "typeCertification": "2",
      "accountOrRefSelected": "3227009953",
      "cusCode": "8.22499825.00.00.100056"
    }
  };
}

module.exports.getCertificado = getCertificado;
