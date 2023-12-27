const hasValue = require("../../../../domain/utils/hasValue");
const { getHeaders } = require("../../../../data/config/remote/utilsRequest");

module.exports.loginUser = loginUser;
module.exports.getInformationLine = getInformationLine;
module.exports.homeAccounts = homeAccounts;
module.exports.postpagoAccounts = postpagoAccounts;
module.exports.getCertificate = getCertificate;

const {user, dataHeaders, device } = require('../entities/types')


/**
 * Login user
 * @param {string} api - Api base URL  
 * @param {string} email - user's email to be authenticated
 * @param {string} password - password of the user to be authenticated
 * @returns {Promise<user>} - Returns a promise that resolves user information
 */
function loginUser(api, email, password) {
  return new Promise((resolve , reject) => {
    my.request({
      url: api + 'v1/soap/LoginUsuarioApp.json',
      method: 'POST',
      data: {
        data: {
          clave: password,
          nombreUsuario: email
        }
      },
      dataType: 'json',
      headers: {
        'X-SESSION-ID':'U2FsdGVkX1/GV7tHxfWg/F3Kmrr9o4ARnM1D6IrygPHYqm0xPsVmxsBr2oA/3o+VD7piOdMGkYCQSuvW7V0dkjNThy4Dg/8BzbG3KHPhrjT1Ir9MG7ZKZqSI7pgym8ty5J2Fa8Y4G33PAJaG/VuhIPQZ+2PNLHttMFgQ1UrF06i9UaRFGi7c+mQDvm8W2rwnbGJbATqKexeyzoyML7ChMuJRy5RLNDHJUJ+iLsaqZvDuNj/j+ArVODd29OdkZZbzz4ko2iCwsBQa8kbA2PDFvZJUs/w+us9iF7Q7PduXRlFD37VXyI986jm5hPB8m04GTYVvCaxCyuBzYgr7LaQSzHZIgJbyn/n1CXDgAVyNlHdqdgNgkZCYS22eFCv6lG2AyppOAJ7ff1Pc4p49vu4I9ZVeqquxqq9/lTJQGJE0NXOyftWgLXLvxPTRzRoU5Jge8BH+P/8DyyScR8RXOSlx6d9p6UkoCGnuI9NfxqdMz6GGLVhUjd3EZYTvWCRr43SxGjxqgUn8s9GyDsj3Oc1niFyZzLIEyj1TKkePlEx0wt8=',
        'X-MC-LINE':'0',
        'X-MC-LOB':'0',
        // 'Content-Length':'107',
        'X-MC-MAIL':'' ,
        'X-MC-SO':'android',
        'X-MC-DEVICE-ID':'apaBtkizNFNBZELjASE/HxysF2nkRUJ3EefWy9UX6y9Wz/iV/sRlb3y+yK8l1FTeogBA9lcLwkVLXFOtrzjTRwp8SGQ9BWh5+G2IeRbaEOMM04ocECda0jGTWwWVjeYC8LwH23SiRUbD73nbyAnMNfunzxeYvhCs/x2s9D+1y8I='
      },
      success: (result) => {
        // respondera la información del servicio   
        console.log("res-login: ", result)      
        resolve(result)
      },
      fail: (error) => {
        console.log("error-login: ", error)
        // respondera la información del servicio  con su error
        reject(error)
      }
    });
  } )
  
}

/**
 * 
 * @param {string} api base url del servicio 
 * @param {*} headers
 */
function getInformationLine(api, headers) {

  return new Promise((resolve , reject) => {
    
    my.request({
      url: api + 'v1/soap/consultaInformacion.json',
      method: 'POST',
      data: {
        data: {
          AccountId:headers.AccountId,
          accountIdHEader:'',
          alias:headers.alias,
          custcode:'',
          esEmpresas:0,
          isZonaPublica:false,
          LineOfBusiness:headers.LineOfBusiness,
          selected:false,
          token:headers.token,
          tokenLine:'',
          valida:0
        }
      },
      dataType: 'json',
      // headers: getHeaders(headers),
      success: (result) => {
        // respondera la información del servicio 
        resolve(result)
      },
      fail: (error) => {
        // respondera la información del servicio  con su error
        reject(error)
      }
    });
  } )
}

/**
 * @function homeAccounts
 * @description Con este servicio se obtiene el listado de cuentas fijas que ha tenido el usuario
 * @param {String} api - Esta es la URL asociada al servicio "GetHogarCuAcBal"
 * @param {string} data - contiene valores asociados a la información del usuario, necesario para el consumo del servicio
 * @returns {Promise} - Cuando el servicio "GetHogarCuAcBal" se consume con datos correctos o incorrectos,
 * devuelve una "Promesa" con el listado de cuentas fijas
*/
async function homeAccounts(api, data) {
  let result = '';
  let headers = {
    "content-type": "application/json; charset=UTF-8",
    "X-MC-LINE": data.AccountId,
    "X-MC-LOB": data.LineOfBusiness,
    "X-MC-MAIL": data.email,
    "X-MC-SO": "android",

    "X-MC-DEVICE-ID": "TcjMbY1VWHthdCqRU0V+JBuTFTwrDUVSMU21y/UgSDBk6TglSrdSVhztavTmygi7e7woaCQZLwqWiSiDYZTv3Y/g2o48I5U6ddFt3XEAP1fdfMrIs16YcMmeokmJXz+I645KqfL3vp66B3I7wfmPxASE9JJFvjvCxnQgbFRzRRg=",
    "X-MC-USER-AGENT": "eyJpcCI6IjEyOC4xNDUuMTI5LjEiLCJ1c2VyQWdlbnQiOiJNaUNsYXJvQXBwLzAuMC4xIChYaWFvbWk7IDIxMDkxMTlERzsgXHUwMDNjYW5kcm9pZC8xMlx1MDAzZSkifQ==",
    "X-SESSION-ID": data.token
  }

  try {
      await my.request({
          url: api + 'General/CertificadoPagos/GetHogarCuAcBal/',
          method: 'POST',
          headers: headers,
          data: {
            "data": {
              "documento": data.document,
              "tipoDocumento": data.typeDocument
          }
        },
        }).then((response) => {
          result = response;
        })
        .catch((response) => {
          result = response;
        });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return result;
}

/**
 * @function postpagoAccounts
 * @description Con este servicio se obtiene el listado de cuentas moviles que ha tenido el usuario
 * @param {String} api - Esta es la URL asociada al servicio "GetMovilCuAcBal"
 * @param {string} data - contiene valores asociados a la información del usuario, necesario para el consumo del servicio
 * @returns {Promise} - Cuando el servicio "GetMovilCuAcBal" se consume con datos correctos o incorrectos, devuelve una "Promesa" con el listado de cuentas moviles
*/
async function postpagoAccounts(api, data) {
  let result = '';
  let headers = {
    "content-type": "application/json; charset=UTF-8",
    "X-MC-LINE": data.AccountId,
    "X-MC-LOB": data.LineOfBusiness,
    "X-MC-MAIL": data.email,
    "X-MC-SO": "android",

    "X-MC-DEVICE-ID": "JH3SvD3BUgFnWxAso8eD/Op/ki+d/iwMGvIrR7QzxwNDX9qmfNWqP3I0Y9Xvq6MYH/aYOw/uoHPM1zPoOGDnfGLEA98TIDR1VB80r+5i6IitkEc8Z8a1hlJcK3fN3+ZVbiFanADlsBcQZu9pP8QfePJRITVZEmnq2a4QgTndM9I=",
    "X-MC-USER-AGENT": "eyJpcCI6IjEwLjAuMi4xNSIsInVzZXJBZ2VudCI6Ik1pQ2xhcm9BcHAvMC4wLjEgKHNhbXN1bmc7IFNNLUc5ODhOOyBcdTAwM2NhbmRyb2lkLzcuMS4yXHUwMDNlKSJ9",
    "X-SESSION-ID": data.token
  }

  try {
      await my.request({
          url: api + 'General/CertificadoPagos/GetMovilCuAcBal/',
          method: 'POST',
          headers: headers,
          data: {
           "data": {
            "documento": data.document,
            "tipoDocumento": data.typeDocument
            }
        },
        }).then((response) => {
          result = response;
        })
        .catch((response) => {
          result = response;
        });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return result;
}

/**
 * @function getCertificate
 * @description Con este servicio se obtiene la certificación al usuario de la cuenta seleccionada
 * @param {String} api - Esta es la URL asociada al servicio "GetCertification"
 * @param {string} data - contiene valores asociados a la información del usuario, necesario para el consumo del servicio
 * @returns {Promise} - Cuando el servicio "GetCertification" se consume con datos correctos o incorrectos,
 * devuelve una "Promesa" con el pdf en Base64 del archivo para poderlo visualizar en la aplicación
*/
async function getCertificate(api, data) {
  let result = '';
  let headers = {
    "content-type": "application/json; charset=UTF-8",
    "X-MC-LINE": data.AccountId,
    "X-MC-LOB": data.LineOfBusiness,
    "X-MC-MAIL": data.email,
    "X-MC-SO": "android",

    "X-MC-DEVICE-ID": "JH3SvD3BUgFnWxAso8eD/Op/ki+d/iwMGvIrR7QzxwNDX9qmfNWqP3I0Y9Xvq6MYH/aYOw/uoHPM1zPoOGDnfGLEA98TIDR1VB80r+5i6IitkEc8Z8a1hlJcK3fN3+ZVbiFanADlsBcQZu9pP8QfePJRITVZEmnq2a4QgTndM9I=",
    "X-MC-USER-AGENT": "eyJpcCI6IjEwLjAuMi4xNSIsInVzZXJBZ2VudCI6Ik1pQ2xhcm9BcHAvMC4wLjEgKHNhbXN1bmc7IFNNLUc5ODhOOyBcdTAwM2NhbmRyb2lkLzcuMS4yXHUwMDNlKSJ9",
    "X-SESSION-ID": data.token
  }

  try {
      await my.request({
          url: api + 'General/CertificadoPagos/GetCertification/',
          method: 'POST',
          headers: headers,
          data: {
           "data": {
            "documento": data.document,
            "tipoDocumento": data.typeDocument,
            "typeCertification": data.typeCertification,
            "accountOrRefSelected": data.accountOrRefSelected
            }
        },
        }).then((response) => {
          result = response;
        })
        .catch((response) => {
          result = response;
        });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return result;
}
