import React, {Component} from 'react'

export default class PrescriptionSuccess extends Component {
  render() {
    return (
      <div className="text-center">
        <p>Receta emitida, tu codigo es:</p>
        <h5 className="display-4">{this.props.match.params.code}</h5>
      </div>
    )
  }
}
