import React, {Component} from 'react'

export default class PrescriptionSuccess extends Component {
  render() {
    return (
      <div>
        <h5 className="display-3">{this.props.match.params.code}</h5>
      </div>
    )
  }
}
