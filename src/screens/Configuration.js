import React, { Component } from 'react';

export default class Configuration extends Component {
  state = {
    e_name: ''
  }

  submit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value
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
                      <input type="text" className="form-control" id="e_name" placeholder="" value={this.state.e_name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">RUN</label>
                      <input type="text" className="form-control" id="run" placeholder="xxxxxxxx-x" value={this.state.run} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Profesión</label>
                    <input type="text" className="form-control" id="e_name" placeholder="" value={this.state.e_name} onChange={this.onChange}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Numero Registro SuperSalud</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Numero Registro Colegio</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
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
                      <label htmlFor="name">Nombre</label>
                      <input type="text" className="form-control" id="e_name" placeholder="Ingrese el nombre" value={this.state.e_name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Codigo Deis</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Telefono</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Email</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                  </div>
                  <h5 className="card-title">Direccion</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Calle</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Número</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Departamento</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Comuna</label>
                      <input type="text" className="form-control" id="run" placeholder="" value={this.state.run} onChange={this.onChange}/>
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
                    <input type="text" className="form-control" id="e_name" placeholder="Ingrese el nombre" value={this.state.e_name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Clave de firma</label>
                    <input type="password" className="form-control" id="e_name" placeholder="Ingrese el nombre" value={this.state.e_name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Re-ingrese clave de firma</label>
                    <input type="password" className="form-control" id="e_name" placeholder="Ingrese el nombre" value={this.state.e_name} onChange={this.onChange}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-block">Guardar</button>
        </form>
      </div>
    )
  }
}
