import React, { Component } from 'react';
const $ = window.$

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

export default class Prescriptions extends Component {
  state = {...PrescriptionInitialState}

  add = (e) => {
    e.preventDefault()
    let {dose, frequency, length} = this.state

    if (dose.length === 0 || isNaN(dose)) {
      $('#dose').addClass('is-invalid')
      return
    }
    if (frequency.length === 0 || isNaN(frequency)) {
      $('#frequency').addClass('is-invalid')
      return
    }
    if (length.length === 0 || isNaN(length)) {
      $('#length').addClass('is-invalid')
      return
    }

    if (this.state.drug !== null) {
      this.props.onAdd({
        dci: this.state.drug.DCI,
        forma: this.state.drug.FORMA_FARMACEUTICA,
        code: this.state.drug.CENS_ID,
        dose: dose,
        frequency: frequency,
        length: length
      })
      this.setState({...PrescriptionInitialState})
      $('#prescipcionModal').modal('toggle')
    }
  }

  selectDrug = (index) => {
    let drug = this.state.drugs[index]
    this.setState({drug, filter: drug.DCI, drugs: []})
  }

  searchDrug = (e) => {
    let filter = e.target.value
    let drugs = DRUGS.filter(d => d.DCI.indexOf(filter) !== -1 || d.DESCRIPCION_PROD_COMERCIAL.indexOf(filter) !== -1)
    this.setState({filter, drugs: drugs.length > 0 && filter.length > 0 ? drugs.slice(0, 3) : []})
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
    return (
      <div className="modal fade" id="prescipcionModal" tabIndex="-1" role="dialog">
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
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="frequency">Horas</label>
                      <input className="form-control" id="frequency"  value={this.state.frequency} onChange={this.onChange}/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="length">Dias</label>
                      <input className="form-control" id="length"  value={this.state.length} onChange={this.onChange}/>
                      <div className="invalid-feedback">Debe ser un numero.</div>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={this.add}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
