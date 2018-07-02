import React, { Component } from 'react';
import Validations from '../utils/Validations'
import config from '../lib/Config'

const KEY = 'prescription-dapp-config'
const storage = window.localStorage
const $ = window.$

export default class Configuration extends Component {
  state = {
    name: '',
    run: '',
    profession: '',
    super_salud: '',
    colegio: '',
    worker_name: '',
    deis: '',
    phone: '',
    email: '',
    street: '',
    street_number: '',
    depto: '',
    comuna: '',
    password: '',
    repassword: '',
    show: false,
    valid: true
  }

  componentDidMount() {
    //let config = JSON.parse(storage.getItem(KEY))
    let data = config.data
    if (data !== null) {
      let {establecimiento, profesional} = data
      this.setState({
        name: establecimiento.name,
        deis: establecimiento.deis,
        phone: establecimiento.phone,
        email: establecimiento.email,
        street: establecimiento.street,
        street_number: establecimiento.street_number,
        depto: establecimiento.depto,
        comuna: establecimiento.comuna,
        worker_name: profesional.name,
        run: profesional.run,
        profession: profesional.profession,
        super_salud: profesional.super_salud,
        colegio: profesional.colegio
      })
    }
  }

  submit = (e) => {
    e.preventDefault()
    console.log(this.state)
    config.saveConfig({
      establecimiento: {
        name: this.state.name,
        deis: this.state.deis,
        phone: this.state.phone,
        email: this.state.email,
        street: this.state.street,
        street_number: this.state.street_number,
        depto: this.state.depto,
        comuna: this.state.comuna
      },
      profesional: {
        name: this.state.worker_name,
        run: this.state.run,
        profession: this.state.profession,
        super_salud: this.state.super_salud,
        colegio: this.state.colegio
      },
      signService: {
        run: this.state.run,
        clave: this.state.password
      }
    })
    this.setState({show: true})
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

  render() {
    return (
      <div>
        <h1 className="display-5 mb-4">Configuración</h1>
        <form onSubmit={this.submit}>
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Datos de Profesional</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="name">Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="" value={this.state.name} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="run">RUN</label>
                      <input type="text" className="form-control" id="run" placeholder="xxxxxxxx-x" value={this.state.run} onChange={this.onChange} data-validation="rut" required/>
                      <div className="invalid-feedback">El rut no es valido.</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Profesión">Profesión</label>
                    <input type="text" className="form-control" id="profession" placeholder="" value={this.state.profession} onChange={this.onChange} required/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="super_salud">Numero Registro SuperSalud</label>
                      <input type="text" className="form-control" id="super_salud" placeholder="" value={this.state.super_salud} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="colegio">Numero Registro Colegio</label>
                      <input type="text" className="form-control" id="colegio" placeholder="" value={this.state.colegio} onChange={this.onChange} data-validation="numeric" required/>
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
                  <h5 className="card-title">Establecimiento Salud</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="worker_name">Nombre</label>
                      <input type="text" className="form-control" id="worker_name" placeholder="Ingrese el nombre" value={this.state.worker_name} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="deis">Codigo Deis</label>
                      <input type="text" className="form-control" id="deis" placeholder="" value={this.state.deis} onChange={this.onChange} required/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Telefono</label>
                      <input type="text" className="form-control" id="phone" placeholder="" value={this.state.phone} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" id="email" placeholder="" value={this.state.email} onChange={this.onChange} data-validation="email" required/>
                      <div className="invalid-feedback">Debe ser correo electronico valido.</div>
                    </div>
                  </div>
                  <h5 className="card-title">Direccion</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="street">Calle</label>
                      <input type="text" className="form-control" id="street" placeholder="" value={this.state.street} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="street_number">Número</label>
                      <input type="text" className="form-control" id="street_number" placeholder="" value={this.state.street_number} onChange={this.onChange} data-validation="numeric" required/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="depto">Departamento</label>
                      <input type="text" className="form-control" id="depto" placeholder="" value={this.state.depto} onChange={this.onChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="comuna">Comuna</label>
                      <input type="text" className="form-control" id="comuna" placeholder="" value={this.state.comuna} onChange={this.onChange} required/>
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
                  <h5 className="card-title">Servicio de Firma</h5>
                  <div className="form-group">
                    <label htmlFor="name">RUN</label>
                    <input type="text" className="form-control" value={this.state.run} disabled/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Clave de firma</label>
                    <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange} required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="repassword">Re-ingrese clave de firma</label>
                    <input type="password" className="form-control" id="repassword" value={this.state.repassword} onChange={this.onChange} required/>
                    <div className="invalid-feedback">Las claves deben ser iguales.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!this.state.show ? null :
            <div className="alert alert-success text-center" role="alert">
              <strong>Información guardada!</strong>
            </div>
          }
          <button className="btn btn-primary btn-block" disabled={!this.state.valid}>Guardar</button>
        </form>
      </div>
    )
  }
}
