import React, { Component } from 'react';
import {searchFarmaco, getFarmaco} from '../lib/Api'

const $ = window.$

const PrescriptionInitialState = {
  filter: '',
  drugs: [],
  drug: null,
  dose: '',
  frequency: '',
  length: '',
  loading: false
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
        dci: this.state.drug.dci,
        forma: this.state.drug.forma_farmaceutica,
        code: this.state.drug.codigo,
        dose: dose,
        frequency: frequency,
        length: length
      })
      this.setState({...PrescriptionInitialState})
      $('#prescipcionModal').modal('toggle')
    }
  }

  selectDrug = (index) => {
    let d = this.state.drugs[index]
    getFarmaco(d.codigo).then(drug => {
      this.setState({drug, filter: drug.dci, drugs: []})
    }).catch(console.error)
  }

  searchDrug = (e) => {
    let filter = e.target.value
    if (filter.trim().length > 0) {
      this.setState({loading: true})
      searchFarmaco(filter.toLowerCase()).then(result => {
        this.setState({drugs: result, loading: false})
      }).catch(console.error)
    } else {
      this.setState({drugs: []})
    }
    this.setState({filter, drug: null})
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
              {this.state.loading ?
                <div className="d-flex justify-content-center align-items-center mt-3"><i className="fas fa-circle-notch fa-spin fa-2x"></i></div> :
                <ul className="list-group">
                  {this.state.drugs.map((d, i) => (
                    <li key={i} className={"list-group-item cs-pointer" + (d === this.state.drug ? ' active' : '')} onClick={() => this.selectDrug(i)}>
                      {d.dci}
                    </li>
                  ))}
                </ul>
              }
              {this.state.drug === null ? null :
                <div className="mt-3">
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="dose">{this.state.drug.forma_farmaceutica}</label>
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
