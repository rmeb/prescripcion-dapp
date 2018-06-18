import React, { Component } from 'react';
import Validations from '../utils/Validations'

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
    e_name: '',
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
    let config = JSON.parse(storage.getItem(KEY))
    if (config !== null) {
      this.setState({
        name: config.name,
        run: config.run,
        profession: config.profession
      })
    }
  }

  submit = (e) => {
    e.preventDefault()
    console.log(this.state)
    storage.setItem(KEY, JSON.stringify({
      name: this.state.name,
      run: this.state.run,
      profession: this.state.profession
    }))
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
                      <input type="text" className="form-control" id="name" placeholder="" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="run">RUN</label>
                      <input type="text" className="form-control" id="run" placeholder="xxxxxxxx-x" value={this.state.run} onChange={this.onChange} data-validation="rut"/>
                      <div className="invalid-feedback">El rut no es valido.</div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Profesión">Profesión</label>
                    <input type="text" className="form-control" id="profession" placeholder="" value={this.state.profession} onChange={this.onChange}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="super_salud">Numero Registro SuperSalud</label>
                      <input type="text" className="form-control" id="super_salud" placeholder="" value={this.state.super_salud} onChange={this.onChange} data-validation="numeric"/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="colegio">Numero Registro Colegio</label>
                      <input type="text" className="form-control" id="colegio" placeholder="" value={this.state.colegio} onChange={this.onChange} data-validation="numeric"/>
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
                      <label htmlFor="e_name">Nombre</label>
                      <input type="text" className="form-control" id="e_name" placeholder="Ingrese el nombre" value={this.state.e_name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="deis">Codigo Deis</label>
                      <input type="text" className="form-control" id="deis" placeholder="" value={this.state.deis} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Telefono</label>
                      <input type="text" className="form-control" id="phone" placeholder="" value={this.state.phone} onChange={this.onChange} data-validation="numeric"/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="email">Email</label>
                      <input type="text" className="form-control" id="email" placeholder="" value={this.state.email} onChange={this.onChange} data-validation="email"/>
                      <div className="invalid-feedback">Debe ser correo electronico valido.</div>
                    </div>
                  </div>
                  <h5 className="card-title">Direccion</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="street">Calle</label>
                      <input type="text" className="form-control" id="street" placeholder="" value={this.state.street} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="street_number">Número</label>
                      <input type="text" className="form-control" id="street_number" placeholder="" value={this.state.street_number} onChange={this.onChange} data-validation="numeric"/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="depto">Departamento</label>
                      <input type="text" className="form-control" id="depto" placeholder="" value={this.state.depto} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="comuna">Comuna</label>
                      <input type="text" className="form-control" id="comuna" placeholder="" value={this.state.comuna} onChange={this.onChange}/>
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
                    <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="repassword">Re-ingrese clave de firma</label>
                    <input type="password" className="form-control" id="repassword" value={this.state.repassword} onChange={this.onChange} data-validation="numeric"/>
                    <div className="invalid-feedback">Las claves deben ser iguales.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!this.state.show ? null :
            <div class="alert alert-success text-center" role="alert">
              <strong>Información guardada!</strong>
            </div>
          }
          <button className="btn btn-primary btn-block" disabled={!this.state.valid}>Guardar</button>
        </form>
      </div>
    )
  }
}

function inputValid(err) {
  return 'form-control' + (err.length !== 0 ? ' is-invalid' : '')
}
