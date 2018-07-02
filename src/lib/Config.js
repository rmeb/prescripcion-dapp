const storage = window.localStorage
const KEY = 'prescription-dapp-config'

/**
* Maneja el localStorage para almacenar la sesion del usuario
**/
class Config {
  constructor() {
    this.data = JSON.parse(storage.getItem(KEY))
  }

  saveConfig(data) {
    this.data = data
    storage.setItem(KEY, JSON.stringify(this.data))
  }
}

export default new Config()
