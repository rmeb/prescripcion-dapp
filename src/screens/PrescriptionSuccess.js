import React, {Component} from 'react'

const QRious= window.QRious

export default class PrescriptionSuccess extends Component {
  componentDidMount() {
    new QRious({element: document.getElementById('qr-code'), value: this.props.match.params.code, size: 200})
  }

  render() {
    return (
      <div className="card">
        <div className="card-body text-center">
          <p>Receta emitida, tu codigo es:</p>
          <h5 className="display-4">{this.props.match.params.code}</h5>
          <canvas id="qr-code"></canvas>
        </div>
      </div>
    )
  }
}
