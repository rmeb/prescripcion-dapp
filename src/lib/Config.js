import session from './Session'

const storage = window.localStorage
const KEY = 'prescription-dapp-config'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Config {
  saveConfig(data) {
    this.data = data
    let run = session.get_data().rut
    storage.setItem(KEY, JSON.stringify(run + '-' +this.data))
  }

  get() {
    if (!this.data) {
      let run = session.get_data().rut
      this.data = JSON.parse(storage.getItem(run + '-' + KEY))
    }
    return this.data
  }
}

export default new Config()
