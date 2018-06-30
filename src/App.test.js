import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import {generateXML} from './lib/SignService'

/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

it('generate xml', () => {
  let object = {
    establecimiento: {
      name: 'Clinica matazanos',
      deis: 'A45',
      phone: '278346372',
      email: 'a@b.c',
      street: 'bilbao',
      street_number: '8076',
      depto: '453',
      comuna: 'La Reina',
    },
    profesional: {
      name: 'Karina',
      run: '1-9',
      profession: 'Curandero',
      super_salud: '334a34',
      colegio: 'ff3kmd',
    },
    paciente: {
      name: 'Matilde',
      document_type: 'RUN',
      document: '233424234-3',
      birthday: '13-03-1995',
      weight: '54.32',
      size: '34',
      address: 'Palisade 343',
      city: 'Vice City',
      phone: '393483382'
    },
    prescriptions: [{
      code: '123',
      dose: '3',
      frequency: '8',
      length: '7'
    }],
    diagnosis:'cataratas',
    timestamp: 0,
    pacient_detail: 'indicaciones al paciente',
    farma_detail: 'indicaciones al farmaceutico',
    contract: '0x0'
  }
  let xml = generateXML(object)
  console.log(xml)
})
