import React, { Component } from 'react';
import Validations from '../utils/Validations'
import {sha3_256} from 'js-sha3'
import {generateXML} from '../lib/SignService'
import {saveRecipe} from '../lib/Api'
import config from '../lib/Config'
import {PRESCRIPTION_SUCCESS, CONFIGURATION} from '../utils/Routes'
import Prescriptions from '../components/Prescriptions'
import session from '../lib/Session'
import {deployContract, isPasswordValid} from '../lib/Eth'

const $ = window.$
const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function randomString(length) {
    var result = '';
    for (var i = length; i > 0; --i) result += CHARS[Math.floor(Math.random() * CHARS.length)];
    return result;
}

function isEmpty(v) {
  return !v || v.length === 0
}

export default class Dashboard extends Component {
  state = {
    name: '',
    document_type: 'RUN',
    document_value: '',
    birthday: '',
    address: '',
    weight: '',
    size: '',
    city: '',
    phone: '',
    diagnosis: '',
    pacient_detail: '',
    farma_detail: '',
    drugs: [],
    code: '',
    loading: false
  }

  componentDidMount() {
    let conf = config.get()
    if (!conf || conf === null) {
      this.props.history.push(CONFIGURATION)
    }
  }

  submit = (pwd) => {
    if (this.state.drugs.length === 0) {
      this.onError('Debe agregar medicamentos')
      return
    }

    let run = session.get_data().rut
    let code = randomString(6)
    let hash = sha3_256(this.state.document_value + ':' + code)

    this.setState({loading: true})
    deployContract(this.state.drugs, pwd).then(contract => {
      console.log(contract.options.address)
      let {establecimiento, profesional, password} = config.get()
      let data = {
        establecimiento, profesional,
        paciente: {
          name: this.state.name,
          document_type: this.state.document_type,
          document: this.state.document_value,
          birthday: this.state.birthday,
          weight: this.state.weight,
          size: this.state.size,
          address: this.state.address,
          city: this.state.city,
          phone: this.state.phone
        },
        prescriptions: [...this.state.drugs],
        diagnosis: this.state.diagnosis,
        pacient_detail: this.state.pacient_detail,
        farma_detail: this.state.farma_detail,
        contract: contract.options.address
      }

      let xml = generateXML(run, data)
      return saveRecipe({id: hash, receta: xml, credentials: {run, clave: password}})
    })
    .then(() => this.props.history.push(PRESCRIPTION_SUCCESS.replace(':code', code)))
    .catch(e => {
      console.log(e)
      this.onError(e)
    })
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value
    let required = e.target.required
    let validation = e.target.dataset.validation

    if (validation) {
      if (!Validations[validation](value)) {
        $('#' + id).addClass('is-invalid')
        this.setState({valid: required ? false : true})
      } else {
        $('#' + id).removeClass('is-invalid')
        this.setState({valid: true})
      }
    }

    this.setState({[id]: value})
  }

  onAdd = (prescription) => {
    this.setState({drugs: [...this.state.drugs, prescription], error: ''})
  }

  removeDrug = (e, index) => {
    e.preventDefault()
    let drugs = [...this.state.drugs]
    drugs.splice(index, 1)
    this.setState({drugs})
  }

  modifyDrug = (drug, index) => {
    let drugs = [...this.state.drugs]
    let obj = drugs[index]
    drugs.splice(index, 1, {
      ...obj, ...drug
    })
    this.setState({drugs})
  }

  onError = (e) => {
    this.setState({loading: false})
    this.props.onError(e)
  }

  validForm = () => {
    let {name, document_value, birthday, address, weight, size, city, phone,
      diagnosis, pacient_detail, farma_detail, drugs} = this.state
    return !(isEmpty(name) || isEmpty(document_value) || isEmpty(birthday) ||
      isEmpty(address) || isEmpty(weight) || isEmpty(size) || isEmpty(city) ||
      isEmpty(phone) || isEmpty(diagnosis) || isEmpty(pacient_detail) || isEmpty(farma_detail)
      || isEmpty(drugs))
  }

  render() {
    return (
      <div>
        <h1 className="display-5 mb-4">Emitir prescripción</h1>
        <form onSubmit={this.submit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Información del paciente</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre" value={this.state.name} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Fecha de nacimiento</label>
                      <input type="date" className="form-control" id="birthday" value={this.state.birthday} onChange={this.onChange} required/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="document_type">Tipo de documento</label>
                      <select className="form-control" id="document_type" value={this.state.document_type} onChange={this.onChange}>
                        <option value="RUN">RUN</option>
                        <option value="PASSPORT">Pasaporte</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="document_value">Documento de identificación</label>
                      <input type="text" className="form-control" id="document_value" value={this.state.document_value} onChange={this.onChange} data-validation={this.state.document_type === 'RUN' ? 'rut' : ''} required/>
                      <div className="invalid-feedback">El rut no es valido.</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingrese la dirección" value={this.state.address} onChange={this.onChange} required/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Telefono</label>
                      <input type="text" className="form-control" id="phone" placeholder="Ingrese el telefono" value={this.state.phone} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="city">Ciudad</label>
                      <input type="text" className="form-control" id="city" placeholder="Ingrese la ciudad" value={this.state.city} onChange={this.onChange} required/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="weight">Peso</label>
                      <input type="text" className="form-control" id="weight" placeholder="Ingrese el peso" value={this.state.weight} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="size">Talla</label>
                      <input type="text" className="form-control" id="size" placeholder="Ingrese la talla" value={this.state.size} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Receta</h5>
                  <div className="form-group">
                    <label htmlFor="name">Diagnostico</label>
                    <textarea className="form-control" id="diagnosis" rows="3" value={this.state.diagnosis} onChange={this.onChange} required></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pacient_detail">Indicaciones al paciente</label>
                    <textarea className="form-control" id="pacient_detail" rows="3" value={this.state.pacient_detail} onChange={this.onChange} required></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="farma_detail">Indicaciones al farmaceutico</label>
                    <textarea className="form-control" id="farma_detail" rows="3" value={this.state.farma_detail} onChange={this.onChange} required></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Prescripciones</h5>
                  <ul className="list-group list-group-flush mt-3">
                    {this.state.drugs.map((d, i) => (
                      <li key={i} className="list-group-item">
                        <PrescriptionItem drug={d} index={i} onRemove={this.removeDrug} onModify={this.modifyDrug}/>
                      </li>
                    ))}
                    <li className="list-group-item text-right">
                      <a href="" data-toggle="modal" data-target="#prescipcionModal">Agregar medicamento.</a>
                    </li>
                  </ul>
                  <Prescriptions onAdd={this.onAdd}/>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-block mt-3" data-toggle="modal" data-target="#passwordModal" disabled={this.state.loading || !this.validForm()}>{this.state.loading ? <i className="fas fa-circle-notch fa-spin"></i> : "Emitir"}</button>
        </form>
        <RequirePassword onClick={this.submit} />
      </div>
    );
  }
}

class RequirePassword extends Component  {
  state = {
    password: ''
  }

  onClick = () => {
    $('#password').removeClass('is-invalid')
    isPasswordValid(this.state.password).then(valid => {
      if (valid) {
        this.props.onClick(this.state.password)
        $('#passwordModal').modal('toggle')
        this.setState({password: ''})
      } else {
        $('#password').addClass('is-invalid')
      }
    }).catch(e => {
      console.error(e)
      $('#password').addClass('is-invalid')
    })
  }

  onChange = (e) => {
    let password = e.target.value
    $('#password').removeClass('is-invalid')
    this.setState({password})
  }

  render() {
    return (
      <div className="modal fade" id="passwordModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Requiere Contraseña</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Contraseña</label>
                <input id="password" className="form-control" type="password" value={this.state.password} onChange={this.onChange} />
                <div className="invalid-feedback">Contraseña incorrecta.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={this.onClick}>Continuar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//} = ({onClick, password, onChange}) => (

class PrescriptionItem extends Component {
  state = {
    dose: '',
    frequency: '',
    length: '',
    modify: false
  }

  componentDidMount() {
    this.setState({
      dose: this.props.drug.dose,
      frequency: this.props.drug.frequency,
      length: this.props.drug.length,
    })
  }

  apply = (e) => {
    let {dose, frequency, length} = this.state

    if (isNaN(dose)) {
      return $('#dose').addClass('is-invalid')
    }
    if (isNaN(frequency)) {
      return $('#frequency').addClass('is-invalid')
    }
    if (isNaN(length)) {
      return $('#length').addClass('is-invalid')
    }


    this.setState({modify: false})
    this.props.onModify({
      dose, frequency, length
    }, this.props.index)
  }

  modify = (e) => {
    e.preventDefault()
    this.setState({modify: true})
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value

    if (isNaN(value)) {
      $('#' + id).addClass('is-invalid')
    } else {
      $('#' + id).removeClass('is-invalid')
    }

    this.setState({[id]: value})
  }

  render() {
    let drug = this.props.drug
    if (!this.state.modify) {
      return <Item drug={drug} onModify={this.modify} onRemove={e => this.props.onRemove(e, this.props.index)} />
    }
    return (
      <div className="row d-flex flex-direction-row align-items-center justify-content-around">
        <strong>{drug.dci}</strong>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="dose">{drug.forma}</label>
            <input className="form-control form-control-sm" id="dose" value={this.state.dose} onChange={this.onChange}/>
            <div className="invalid-feedback">Debe ser un numero.</div>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="frequency">Horas</label>
            <input className="form-control form-control-sm" id="frequency" value={this.state.frequency} onChange={this.onChange}/>
            <div className="invalid-feedback">Debe ser un numero.</div>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="length">Dias</label>
            <input className="form-control form-control-sm" id="length"  value={this.state.length} onChange={this.onChange}/>
            <div className="invalid-feedback">Debe ser un numero.</div>
          </div>
        </div>
        <button className="btn btn-success" onClick={this.apply}><i className="fas fa-check"></i></button>
      </div>
    )
  }
}

const Item = ({drug, onModify, onRemove}) => (
  <div className="d-flex justify-content-between align-items-center">
    <a href="" onClick={onModify}>
      <strong>{drug.dci}</strong>, {drug.dose} {drug.forma} cada {drug.frequency} horas por {drug.length} dias
    </a>
    <a href="" onClick={onRemove}><i className="fas fa-times fa-2x"></i></a>
  </div>
)
