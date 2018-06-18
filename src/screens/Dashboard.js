import React, { Component } from 'react';

export default class Dashboard extends Component {
  state = {
    name: '',
    document_type: 'RUN',
    document: '',
    birthday: '',
    address: '',
    weight: '',
    size: '',
    city: '',
    phone: '',
    diagnosis: '',
    pacient_detail: '',
    farma_detail: '',
    drugs: []
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

  onAdd = (prescription) => {
    console.log(prescription)
    this.setState({drugs: [...this.state.drugs, prescription]})
  }

  removeDrug = (index) => {
    let drugs = [...this.state.drugs]
    drugs.splice(index, 1)
    this.setState({drugs})
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
                      <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="birthday">Fecha de nacimiento</label>
                      <input type="text" className="form-control" id="birthday" placeholder="DD/MM/YYYY" value={this.state.birthday} onChange={this.onChange}/>
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
                      <label htmlFor="document">Documento de identificación</label>
                      <input type="text" className="form-control" id="document" placeholder="Ingrese el documento de identificación" value={this.state.document} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingrese la dirección" value={this.state.address} onChange={this.onChange}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="phone">Telefono</label>
                      <input type="text" className="form-control" id="phone" placeholder="Ingrese el telefono" value={this.state.phone} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="city">Ciudad</label>
                      <input type="text" className="form-control" id="city" placeholder="Ingrese la ciudad" value={this.state.city} onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="weight">Peso</label>
                      <input type="text" className="form-control" id="weight" placeholder="Ingrese el peso" value={this.state.weight} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="size">Talla</label>
                      <input type="text" className="form-control" id="size" placeholder="Ingrese la talla" value={this.state.size} onChange={this.onChange}/>
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
                    <textarea className="form-control" id="diagnosis" rows="3" value={this.state.diagnosis} onChange={this.onChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pacient_detail">Indicaciones al paciente</label>
                    <textarea className="form-control" id="pacient_detail" rows="3" value={this.state.pacient_detail} onChange={this.onChange}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="farma_detail">Indicaciones al farmaceutico</label>
                    <textarea className="form-control" id="farma_detail" rows="3" value={this.state.farma_detail} onChange={this.onChange}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Prescripciones <button className="btn btn-danger" data-toggle="modal" data-target="#prescipcionModal"><i className="far fa-plus"></i></button></h5>
                  <ul className="list-group list-group-flush mt-3">
                    {this.state.drugs.map((d, i) => (
                      <li key={i} className="list-group-item">
                        <strong>{d.drug.DCI}</strong> {d.dose} {d.drug.FORMA_FARMACEUTICA} cada {d.frequency} horas por {d.length} dias
                        <button type="button" className="close" aria-label="Close" onClick={e => this.removeDrug(i)}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Prescriptions onAdd={this.onAdd} />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Emitir</button>
        </form>
      </div>
    );
  }
}

const DRUGS = [{
  CENS_ID: 6663524,
  DCI: 'aciclovir',
  FORMA_FARMACEUTICA: 'comprimido',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 400,
  ES_RESTRINGIDO: 'no',
  DESCRIPCION_PROD_COMERCIAL: 'aciclovir 400 mg comprimido (Mintlab)'
}, {
  CENS_ID: 120123,
  DCI: 'sertralina',
  FORMA_FARMACEUTICA: 'comprimido',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 50,
  ES_RESTRINGIDO: 'no',
  DESCRIPCION_PROD_COMERCIAL: 'altruline 50 mg comprimido recubierto (Roerig)'
}, {
  CENS_ID: 6619658,
  DCI: 'fentermina',
  FORMA_FARMACEUTICA: 'cápsula',
  CONCENTRACION_UNIDAD: 'mg',
  CONCENTRACION_VALOR: 37.5,
  ES_RESTRINGIDO: 'si',
  DESCRIPCION_PROD_COMERCIAL: 'sentis 37,5 mg cápsula (Lab Chile)'
}]

const PrescriptionInitialState = {
  filter: '',
  drugs: [],
  drug: null,
  dose: '',
  frequency: '',
  length: ''
}

class Prescriptions extends Component {
  state = {...PrescriptionInitialState}

  add = (e) => {
    e.preventDefault()
    if (this.state.drug !== null) {
      this.props.onAdd({
        drug: {...this.state.drug},
        dose: this.state.dose,
        frequency: this.state.frequency,
        length: this.state.length
      })
      this.setState({...PrescriptionInitialState})
    }
  }

  selectDrug = (index) => {
    this.setState({drug: this.state.drugs[index]})
  }

  searchDrug = (e) => {
    let filter = e.target.value
    let drugs = DRUGS.filter(d => d.DCI.indexOf(filter) !== -1 || d.DESCRIPCION_PROD_COMERCIAL.indexOf(filter) !== -1)
    this.setState({filter, drugs: drugs.length > 0 && filter.length > 0 ? drugs.slice(0, 3) : []})
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value
    this.setState({[id]: value})
  }

  render() {
    return (
      <div className="modal fade" id="prescipcionModal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Buscar medicamentos</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" value={this.state.filter} onChange={this.searchDrug}/>
              <ul className="list-group">
                {this.state.drugs.map((d, i) => (
                  <li key={i} className={"list-group-item cs-pointer" + (d === this.state.drug ? ' active' : '')} onClick={() => this.selectDrug(i)}>
                    {d.DCI}
                  </li>
                ))}
              </ul>
              {this.state.drug === null ? null :
                <div className="mt-3">
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="dose">{this.state.drug.FORMA_FARMACEUTICA}</label>
                      <input className="form-control" id="dose" value={this.state.dose} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="frequency">Horas</label>
                      <input className="form-control" id="frequency"  value={this.state.frequency} onChange={this.onChange}/>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="length">Dias</label>
                      <input className="form-control" id="length"  value={this.state.length} onChange={this.onChange}/>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.add}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
