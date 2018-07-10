import session from './Session'

const storage = window.localStorage
const KEY = 'prescription-dapp-config'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Config {
  saveConfig(data) {
    let run = session.get_data().rut.toUpperCase()
    storage.setItem(run + '-' + KEY, JSON.stringify(data))
  }

  get() {
    let run = session.get_data().rut.toUpperCase()
    try {
      return JSON.parse(storage.getItem(run + '-' + KEY))
    } catch (e) {
      return null
    }
  }
}

export default new Config()
