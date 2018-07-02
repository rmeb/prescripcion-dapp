const APIURL = 'https://rx-keyserver.herokuapp.com'
const RECIPE_API = 'http://192.168.0.25:4000'
//const RECIPE_API = 'https://servidor-rme-sandbox.herokuapp.com/'

export function save_keystore(rut, body) {
  return send('/keystore/' + rut, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export function get_keystore(rut, token) {
  return send('/keystore/' + rut, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function refund(address) {
  return send('/refund/' + address, {
    method: 'GET'
  })
}

export function saveRecipeXml(data) {
  return fetch(RECIPE_API + '/receta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response).then(success)
}

export function getRecipeXml(identifier) {
  return fetch(RECIPE_API + '/receta/' + identifier, {
    method: 'GET'
  }).then(response).then(success)
}

function send(path, options) {
  return fetch(APIURL + path, options).then(response).then(success)
}

function response(response) {
  let status = response.status
  if (status === 200 || status === 400 || status === 500) {
    return response.json()
  }
  return Promise.reject(response.statusText)
}

function success(response) {
  return response.status === 'success' ? response.data : Promise.reject(response.data)
}
