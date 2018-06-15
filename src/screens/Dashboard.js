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

  render() {
    return (
      <div>
        <h1 className="display-5 mb-4">Emitir prescripción</h1>
        <form onSubmit={this.submit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Información del paciente</h5>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Ingrese el nombre" value={this.state.name} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="document_type">Tipo de documento</label>
                    <select className="form-control" id="document_type" value={this.state.document_type} onChange={this.onChange}>
                      <option value="RUN">RUN</option>
                      <option value="PASSPORT">Pasaporte</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="document">Documento de identificación</label>
                    <input type="text" className="form-control" id="document" placeholder="Ingrese el documento de identificación" value={this.state.document} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="birthday">Fecha de nacimiento</label>
                    <input type="text" className="form-control" id="birthday" placeholder="DD/MM/YYYY" value={this.state.birthday} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="weight">Peso</label>
                    <input type="text" className="form-control" id="weight" placeholder="Ingrese el peso" value={this.state.weight} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="size">Talla</label>
                    <input type="text" className="form-control" id="size" placeholder="Ingrese la talla" value={this.state.size} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input type="text" className="form-control" id="address" placeholder="Ingrese la dirección" value={this.state.address} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Ciudad</label>
                    <input type="text" className="form-control" id="city" placeholder="Ingrese la ciudad" value={this.state.city} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefono</label>
                    <input type="text" className="form-control" id="phone" placeholder="Ingrese el telefono" value={this.state.phone} onChange={this.onChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
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
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Prescripciones</h5>
                  <Prescriptions onAdd={this.onAdd} />
                  <ul className="list-group list-group-flush mt-3">
                    {this.state.drugs.map((d, i) => (
                      <li key={i} className="list-group-item"><strong>{d.drug.DCI}</strong> {d.dose} {d.drug.FORMA_FARMACEUTICA} cada {d.frequency} horas por {d.length} dias</li>
                    ))}
                  </ul>
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

class Prescriptions extends Component {
  state = {
    filter: '',
    drug: null,
    dose: '',
    frequency: '',
    length: ''
  }

  add = (e) => {
    e.preventDefault()
    if (this.state.drug !== null) {
      this.props.onAdd({
        drug: {...this.state.drug},
        dose: this.state.dose,
        frequency: this.state.frequency,
        length: this.state.length
      })
    }
  }

  searchDrug = (e) => {
    let filter = e.target.value
    let drugs = DRUGS.filter(d => d.DCI.indexOf(filter) !== -1 || d.DESCRIPCION_PROD_COMERCIAL.indexOf(filter) !== -1)
    this.setState({filter, drug: drugs.length > 0 && filter.length > 0 ? drugs[0] : null})
    /*if (filter.length !== 0) {

    } else {
      window.$('#test-drop').dropdown()
    }
*/
  }

  onChange = (e) => {
    let id = e.target.id
    let value = e.target.value

    this.setState({[id]: value})
  }

  render() {
    return (
      <div>
        <input type="text" className="form-control" value={this.state.filter} onChange={this.searchDrug}/>
        {this.state.drug !== null ? <Search drug={this.state.drug} onClick={() => {}}/> : null}
        <div className="mt-3">
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="dose">Capsulas</label>
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
        <button className="btn btn-danger btn-block" onClick={this.add}>Agregar</button>
      </div>
    )
  }
}

const Search = ({drug, onClick}) => (
  <div className="card" onClick={onClick}>
    <div className="card-body">
      <h5 className="card-title">{drug.DCI}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{drug.DESCRIPCION_PROD_COMERCIAL}</h6>
    </div>
  </div>
)
