const UserRepository = require('../data/attributes/user/repository/UserRepository');

/**
 * Import types required by documentation
 */
const {dataHeaders} = require('../data/attributes/user/entities/types')

/**
 * @module domain/userViewModel
 */


 /**
 * @typedef {Object} Account
 * @property {string} LineOfBusiness - Business line
 * @property {string} AccountId - Phone number
 * @property {string} alias - Account nickname
 * @property {string} token - It is required to bring the information
 * @property {string} email - the year it came to life
 * @property {string} codigo 
 * @property {string} descripcion
 * @property {string} imei
 * @property {string} marca
 * @property {string} modelo
 */


 
/**
 * @function signUp
 * @param {string} email
 * @param {string} password
 * @returns {Object}
*/
async function signUp(email, password) {
  const userRepository = new UserRepository();
  const queryUserRemote = await userRepository.loginUserRemote(email, password);
  if(queryUserRemote.data.error === 0) {
    const {cuentas} = queryUserRemote.data.response;
    /** Se registra el usuario en local */
    if(cuentas.length > 0) {
      if(userRepository.createUserLocal(queryUserRemote.data)) {
        return { error: 0 }
      } else {
        return { error: 1, response: 'Error guardando los datos del usuario en el storage' }
      }
    } else {
      return {error: 1, response: 'No tienes una cuentas asociadas'};
    }
  } else {
    return {error: 1, response: queryUserRemote.data.response};
  }
  
}

/**
 * @function getLineSelect
 * @description Brings from localstorage the data of the selected line
 * @returns {Object | null} If is nothing found, it returns null.
*/
function getLineSelect() {
  const userRepository = new UserRepository();
  const lineData = userRepository.getInfoStorage('LINE_SELECT');
  if(lineData) {
    return lineData
  } else {
    return null
  }
}

/**
 * @function getUserLogged
 * @description Brings from localstorage the data of the user
 * @returns {Object | null} If is nothing found, it returns null.
*/
function getUserLogged() {
  const userRepository = new UserRepository();
  const userData = userRepository.getInfoStorage('REGISTERED_USER');
  if(userData) {
    return userData
  } else {
    return null
  }
}

/**
 * @function setLocalLine
 * @description Set a user account to localstorage
 * @param {Account} data selected user account
 * @returns {Boolean} true or false if could be enter
*/
function setLocalLine(data) {
  const userRepository = new UserRepository();
  return userRepository.setLocalLine(data);
}

/**
 * @function startClearStorage
 * @description Clean up the localstorage
 * @returns {Boolean} true or false if could be cleaned
*/
function startClearStorage(){
  const userRepository = new UserRepository();
  const clearLocalStorage = userRepository.clearStorage();
  return clearLocalStorage;
}

/**
 * @function getInformationLine
 * @description Gets the information of the selected account (imei, brand, model)
 * @param {Account} data selected user account
 * @returns {Object} selected user account
*/
async function getInformationLine(data) {
  const userRepository = new UserRepository();
  const infoLine = await userRepository.getInformationLine(data);
  if (infoLine.status === 200) {
    if(infoLine.data.error === 0) {
      if(infoLine.data.response[0].descripcion === 'Parametros incompletos.') {
        throw new Error('Error consultando el servicio, parametros incompletos')
      } else {
        return infoLine.data
      }
    } else {
      throw new Error('Error consultando el servicio, error de validación')
    }
  } else {
    throw new Error('Error consultando el servicio')
  }
} 

/**
 * @async
 * @function getHomeAccounts
 * @description Esta funcion es para llamar al servico GetHogarCuAcBal, empleado para obtener la lista de cuentas fijas.
 * @returns {Object} - Cuando el servicio se consume devuelve un objeto, cuando "error" = 1 puede ser por falla el servicio y 
 * cuando "error" = 0 es porque el servicio responde correctamente y se trae los campos de validacion.
 */
async function getHomeAccounts(){
  // const {documentNumber, email} = this.getUserLogged();
  const userRepository = new UserRepository();

  const data = {
    email: "thatanspk@gmail.com",
    AccountId: "3124059566",
    LineOfBusiness: "2",
    document: '1010200506',
    typeDocument: '1',
    token: "U2FsdGVkX18UqOuOazQ4yPsElnT68Vg81BzGWV0FtCWdmpBAWLs6nsZty9pEzuaCMF7BpYPRo7qr2e92JJSmFYpJjZi5HNEBBpBsaQNW+ivIdkC6WeSG9Y5Ityw16GbDNoRe52vRv4F3Im4E0mwy9k++z9ogdge0ntsc8nd5rjWSpiUk4gZVCfzz7x0cbZqfqzdYYffbZRTAmDK1Gd9PdRidqWdbXs221oCXOggBibC7REGYmcIxIkMMAqvrkKAM99l5SPvRf0hTW3ksL1Zmvvh4LdXbZKLkw+Ff9wFV57dmhqZjfIyLi6AGFx2nawLlasxXJV12aHymPpAVsbSvB94mTYYNm3kN+iYkDL5bl4rLG+7akvLohEBEHkWlo3QJBZffwarVzPdz6Gd003hdKtwm+bfDla6TgAP+e78Wt5j7L/A2XfQn6dP3u3Ibe7ZpgdjWkzYpR/WAx4MBGzmqSQG59LhDHzU63oNqfjKQZMHCs/uWs/MjiZzKoOIfOXfYtYkMv3+C69HgENqkMCViocRyiAs3RW9b4coDozNX3UyZSQ6D+mhppUvMARfCRtzlrBXWpCSX9I1ng8aphybNpCHExNqfgvcyujVTjpOM4qmZpw/pjLW8VZQOZdSukR4wylNk31HGYOr2Wj1jaCRUzZanejQ+YDs+iVrPHjibBNNvZXZaVLNWefQa9nXs68WQ6NTLqrbJ+SR5emvt3TyRi0tZPOeqTkR5786WxGfkIl4lwF7ITpsVKN7mQDGcQJLS1JzSGiYJtmL+LMxkSdzfVPo+NFbl9x82A8WQBYZQF3QbpOFoJXU8n53Ebronnz5Lzec5I3HQJWpgqUTlRBJyZCVnq5HRWGie4wKyzOKJAivv72t27F3mligQnydi9oHBXIsG0MoQGOIhS0w08VXRD7jkBrWJTwwkxo8ziCGXrriIj61yDyWloZFGqH6NQrGknzihPiwyr8YBss3ehbSr7PjnIP3ZAecaZlkkYgpZjnukqpfO+O7w5Ur/iKmH+Ez4nlecOchumsHm98jplBz890df639lI3QNo3z9m4iX0JHHuVgfor6aoy5Uy6xFS2j+jYhldqwPKrnUiiOXiDvXa+8GSATJ7zPMTl1Z1MN8L0VBvzvLUMLuzpawP0PiAewBfGLg7xc8mRy9GrB+QsqxxRxiRPAph68j5UdO0gd+lbNPSsI3SIuKHwSe8B1IUqxSDsPNvxQXi6Uriu7jGA/wiUrHDLFg7n8oO9+PjSOkTmUmhl09tOPSO5P9+PRxRRFbHSung1bn+tISwQ657aSv+MtguDHXkY2mjFKMGfcXP4I="
  }

  const responseHomeAccounts = await userRepository.homeAccountsRemote(data)
  let response = "";
  switch (true) {
    case (responseHomeAccounts.status != 200) :
      response = {error: 1, response: 'error_network'};
      break; 
    case (responseHomeAccounts.data.error == 0) :
      response = {error: 0, data: responseHomeAccounts.data.response};
      break;
    default:
      response = {error: 1, ...responseHomeAccounts.data};
      break;
    }
  return response;
}

/**
 * @async
 * @function getPostpagoAccounts
 * @description Esta funcion es para llamar al servico GetMovilCuAcBal, y obtiene el listado de cuentas moviles que ha tenido el usuario
 * @returns {Object} - Cuando el servicio se consume devuelve un objeto, cuando "error" = 1 puede ser por falla el servicio y 
 * cuando "error" = 0 es porque el servicio responde correctamente y se trae los campos de validacion.
 */
async function getPostpagoAccounts(){
  const userRepository = new UserRepository();

  const data = {
    email: "thatanspk@gmail.com",
    AccountId: "3124059566",
    LineOfBusiness: "2",
    document: '1010200506',
    typeDocument: '1',
    token: "U2FsdGVkX18UqOuOazQ4yPsElnT68Vg81BzGWV0FtCWdmpBAWLs6nsZty9pEzuaCMF7BpYPRo7qr2e92JJSmFYpJjZi5HNEBBpBsaQNW+ivIdkC6WeSG9Y5Ityw16GbDNoRe52vRv4F3Im4E0mwy9k++z9ogdge0ntsc8nd5rjWSpiUk4gZVCfzz7x0cbZqfqzdYYffbZRTAmDK1Gd9PdRidqWdbXs221oCXOggBibC7REGYmcIxIkMMAqvrkKAM99l5SPvRf0hTW3ksL1Zmvvh4LdXbZKLkw+Ff9wFV57dmhqZjfIyLi6AGFx2nawLlasxXJV12aHymPpAVsbSvB94mTYYNm3kN+iYkDL5bl4rLG+7akvLohEBEHkWlo3QJBZffwarVzPdz6Gd003hdKtwm+bfDla6TgAP+e78Wt5j7L/A2XfQn6dP3u3Ibe7ZpgdjWkzYpR/WAx4MBGzmqSQG59LhDHzU63oNqfjKQZMHCs/uWs/MjiZzKoOIfOXfYtYkMv3+C69HgENqkMCViocRyiAs3RW9b4coDozNX3UyZSQ6D+mhppUvMARfCRtzlrBXWpCSX9I1ng8aphybNpCHExNqfgvcyujVTjpOM4qmZpw/pjLW8VZQOZdSukR4wylNk31HGYOr2Wj1jaCRUzZanejQ+YDs+iVrPHjibBNNvZXZaVLNWefQa9nXs68WQ6NTLqrbJ+SR5emvt3TyRi0tZPOeqTkR5786WxGfkIl4lwF7ITpsVKN7mQDGcQJLS1JzSGiYJtmL+LMxkSdzfVPo+NFbl9x82A8WQBYZQF3QbpOFoJXU8n53Ebronnz5Lzec5I3HQJWpgqUTlRBJyZCVnq5HRWGie4wKyzOKJAivv72t27F3mligQnydi9oHBXIsG0MoQGOIhS0w08VXRD7jkBrWJTwwkxo8ziCGXrriIj61yDyWloZFGqH6NQrGknzihPiwyr8YBss3ehbSr7PjnIP3ZAecaZlkkYgpZjnukqpfO+O7w5Ur/iKmH+Ez4nlecOchumsHm98jplBz890df639lI3QNo3z9m4iX0JHHuVgfor6aoy5Uy6xFS2j+jYhldqwPKrnUiiOXiDvXa+8GSATJ7zPMTl1Z1MN8L0VBvzvLUMLuzpawP0PiAewBfGLg7xc8mRy9GrB+QsqxxRxiRPAph68j5UdO0gd+lbNPSsI3SIuKHwSe8B1IUqxSDsPNvxQXi6Uriu7jGA/wiUrHDLFg7n8oO9+PjSOkTmUmhl09tOPSO5P9+PRxRRFbHSung1bn+tISwQ657aSv+MtguDHXkY2mjFKMGfcXP4I="
  }

  const resPostpagoAccounts = await userRepository.postpagoAccountsRemote(data)
  let response = "";
  switch (true) {
    case (resPostpagoAccounts.status != 200) :
      response = {error: 1, response: 'error_network'};
      break; 
    case (resPostpagoAccounts.data.error == 0) :
      response = {error: 0, data: resPostpagoAccounts.data.response};
      break;
    default:
      response = {error: 1, ...resPostpagoAccounts.data};
      break;
    }
  return response;
}

/**
 * @async
 * @function getCertificate
 * @description Esta funcion es para llamar al servico GetCertification, empleado para obtener la certificación al usuario de la cuenta seleccionada,
 * responde el Base64 del archivo para poderlo visualizar en la aplicación si asi se requiere
 * @returns {Object} - Cuando el servicio se consume devuelve un objeto, cuando "error" = 1 puede ser por falla el servicio y 
 * cuando "error" = 0 es porque el servicio responde correctamente y se trae los campos de validacion.
 */
async function getCertificate(info){
  const userRepository = new UserRepository();
  const data = {
    email: "thatanspk@gmail.com",
    LineOfBusiness: "2",
    document: '1010200506',
    typeDocument: '1',
    token: "U2FsdGVkX18UqOuOazQ4yPsElnT68Vg81BzGWV0FtCWdmpBAWLs6nsZty9pEzuaCMF7BpYPRo7qr2e92JJSmFYpJjZi5HNEBBpBsaQNW+ivIdkC6WeSG9Y5Ityw16GbDNoRe52vRv4F3Im4E0mwy9k++z9ogdge0ntsc8nd5rjWSpiUk4gZVCfzz7x0cbZqfqzdYYffbZRTAmDK1Gd9PdRidqWdbXs221oCXOggBibC7REGYmcIxIkMMAqvrkKAM99l5SPvRf0hTW3ksL1Zmvvh4LdXbZKLkw+Ff9wFV57dmhqZjfIyLi6AGFx2nawLlasxXJV12aHymPpAVsbSvB94mTYYNm3kN+iYkDL5bl4rLG+7akvLohEBEHkWlo3QJBZffwarVzPdz6Gd003hdKtwm+bfDla6TgAP+e78Wt5j7L/A2XfQn6dP3u3Ibe7ZpgdjWkzYpR/WAx4MBGzmqSQG59LhDHzU63oNqfjKQZMHCs/uWs/MjiZzKoOIfOXfYtYkMv3+C69HgENqkMCViocRyiAs3RW9b4coDozNX3UyZSQ6D+mhppUvMARfCRtzlrBXWpCSX9I1ng8aphybNpCHExNqfgvcyujVTjpOM4qmZpw/pjLW8VZQOZdSukR4wylNk31HGYOr2Wj1jaCRUzZanejQ+YDs+iVrPHjibBNNvZXZaVLNWefQa9nXs68WQ6NTLqrbJ+SR5emvt3TyRi0tZPOeqTkR5786WxGfkIl4lwF7ITpsVKN7mQDGcQJLS1JzSGiYJtmL+LMxkSdzfVPo+NFbl9x82A8WQBYZQF3QbpOFoJXU8n53Ebronnz5Lzec5I3HQJWpgqUTlRBJyZCVnq5HRWGie4wKyzOKJAivv72t27F3mligQnydi9oHBXIsG0MoQGOIhS0w08VXRD7jkBrWJTwwkxo8ziCGXrriIj61yDyWloZFGqH6NQrGknzihPiwyr8YBss3ehbSr7PjnIP3ZAecaZlkkYgpZjnukqpfO+O7w5Ur/iKmH+Ez4nlecOchumsHm98jplBz890df639lI3QNo3z9m4iX0JHHuVgfor6aoy5Uy6xFS2j+jYhldqwPKrnUiiOXiDvXa+8GSATJ7zPMTl1Z1MN8L0VBvzvLUMLuzpawP0PiAewBfGLg7xc8mRy9GrB+QsqxxRxiRPAph68j5UdO0gd+lbNPSsI3SIuKHwSe8B1IUqxSDsPNvxQXi6Uriu7jGA/wiUrHDLFg7n8oO9+PjSOkTmUmhl09tOPSO5P9+PRxRRFbHSung1bn+tISwQ657aSv+MtguDHXkY2mjFKMGfcXP4I=",
    AccountId: "3124059566", //info.accountSelected.account,
    typeCertification: "3", //info.typeCertification,
    accountOrRefSelected: "87054011", //info.accountSelected.ref ? info.accountSelected.ref : info.accountSelected.account
  }

  const resCertificate = await userRepository.getCertificateRemote(data)
  let response = "";
  switch (true) {
    case (resCertificate.status != 200) :
      response = {error: 1, response: 'error_network'};
      break; 
    case (resCertificate.data.error == 0) :
      response = {error: 0, data: resCertificate.data.response};
      break;
    default:
      response = {error: 1, ...resCertificate.data};
      break;
    }
  return response;
}

module.exports.setLocalLine = setLocalLine;
module.exports.signUp = signUp;
module.exports.startClearStorage = startClearStorage;
module.exports.getUserLogged = getUserLogged;
module.exports.getInformationLine = getInformationLine;
module.exports.getLineSelect = getLineSelect;
module.exports.getHomeAccounts = getHomeAccounts;
module.exports.getPostpagoAccounts = getPostpagoAccounts;
module.exports.getCertificate = getCertificate;