const XML_TEMPLATE = '<?xml version="1.0" encoding="UTF-8"?><RME><ESTABLECIMIENTO_SALUD><NOMBRE>{NOMBRE}</NOMBRE><CODIGO_DEIS>{CODIGO_DEIS}</CODIGO_DEIS><TELEFONO>{TELEFONO}</TELEFONO><EMAIL>{EMAIL}</EMAIL><DIRECCION><CALLE>{CALLE}</CALLE><NUMERO>{NUMERO}</NUMERO><DEPARTAMENTO>{DEPARTAMENTO}</DEPARTAMENTO><COMUNA>{COMUNA}</COMUNA></DIRECCION></ESTABLECIMIENTO_SALUD><PROFESIONAL_PRESCRIPTOR><NOMBRE>{NOMBRE_PROFESIONAL}</NOMBRE><DOCUMENTO_IDENTIFICACION>RUN</DOCUMENTO_IDENTIFICACION><NUMERO_DOCUMENTO>{NUMERO_DOCUMENTO_PROFESIONAL}</NUMERO_DOCUMENTO><PROFESION>{PROFESION}</PROFESION><NUMERO_REGISTRO_PRESTADORES_INDIVIDUALES_SI_SALUD>{NUMERO_REGISTRO_PRESTADORES_INDIVIDUALES_SI_SALUD}</NUMERO_REGISTRO_PRESTADORES_INDIVIDUALES_SI_SALUD><NUMERO_REGISTRO_COLEGIO_PROFESIONAL>{NUMERO_REGISTRO_COLEGIO_PROFESIONAL}</NUMERO_REGISTRO_COLEGIO_PROFESIONAL></PROFESIONAL_PRESCRIPTOR><PACIENTE><NOMBRE>{NOMBRE_PACIENTE}</NOMBRE><DOCUMENTO_IDENTIFICACION>{DOCUMENTO_IDENTIFICACION}</DOCUMENTO_IDENTIFICACION><NUMERO_DOCUMENTO>{NUMERO_DOCUMENTO}</NUMERO_DOCUMENTO><FECHA_NACIMIENTO>{FECHA_NACIMIENTO}</FECHA_NACIMIENTO><PESO>{PESO}</PESO><TALLA>{TALLA}</TALLA><DIRECCION>{DIRECCION}</DIRECCION><CIUDAD>{CIUDAD}</CIUDAD><TELEFONO>{TELEFONO_PACIENTE}</TELEFONO></PACIENTE><PRESCRIPCIONES>{PRESCRIPCIONES}</PRESCRIPCIONES><DIAGNOSTICO>{DIAGNOSTICO}</DIAGNOSTICO><FECHA_PRESCRIPCION>{FECHA_PRESCRIPCION}</FECHA_PRESCRIPCION><INDICACIONES_AL_PACIENTE>{INDICACIONES_AL_PACIENTE}</INDICACIONES_AL_PACIENTE><INDICACIONES_AL_FARMACEUTICO>{INDICACIONES_AL_FARMACEUTICO}</INDICACIONES_AL_FARMACEUTICO><CONTRATO_DISPENSACION>{CONTRATO_DISPENSACION}</CONTRATO_DISPENSACION></RME>'

const XML_PRESCRIPTION = '<PRESCRIPCION><CODIGO_MEDICAMENTO>{CODIGO_MEDICAMENTO}</CODIGO_MEDICAMENTO><DOSIS>{DOSIS}</DOSIS><FRECUENCIA>{FRECUENCIA}</FRECUENCIA><DURACION_DE_LA_INDICACION>{DURACION_DE_LA_INDICACION}</DURACION_DE_LA_INDICACION></PRESCRIPCION>'
const SOAP = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.signserver.esign.com/"><soapenv:Header/><soapenv:Body><ws:intercambiaDoc><Encabezado><User>{RUN}</User><Password>{CLAVE}</Password><NombreConfiguracion>{RUN}</NombreConfiguracion></Encabezado><Parametro><Documento>{DOCUMENT}</Documento><NombreDocumento></NombreDocumento><MetaData></MetaData></Parametro></ws:intercambiaDoc></soapenv:Body></soapenv:Envelope>'

export function generateXML(object) {
  let {establecimiento, profesional, paciente, prescriptions} = object
  let xml = XML_TEMPLATE.replace('{NOMBRE}', establecimiento.name)
  xml = xml.replace('{CODIGO_DEIS}', establecimiento.deis)
  xml = xml.replace('{TELEFONO}', establecimiento.phone)
  xml = xml.replace('{EMAIL}', establecimiento.email)
  xml = xml.replace('{CALLE}', establecimiento.street)
  xml = xml.replace('{NUMERO}', establecimiento.street_number)
  xml = xml.replace('{DEPARTAMENTO}', establecimiento.depto)
  xml = xml.replace('{COMUNA}', establecimiento.comuna)

  xml = xml.replace('{NOMBRE_PROFESIONAL}', profesional.name)
  xml = xml.replace('{NUMERO_DOCUMENTO_PROFESIONAL}', profesional.run)
  xml = xml.replace('{PROFESION}', profesional.profession)
  xml = xml.replace('{NUMERO_REGISTRO_PRESTADORES_INDIVIDUALES_SI_SALUD}', profesional.super_salud)
  xml = xml.replace('{NUMERO_REGISTRO_COLEGIO_PROFESIONAL}', profesional.colegio)

  xml = xml.replace('{NOMBRE_PACIENTE}', paciente.name)
  xml = xml.replace('{DOCUMENTO_IDENTIFICACION}', paciente.document_type)
  xml = xml.replace('{NUMERO_DOCUMENTO}', paciente.document)
  xml = xml.replace('{FECHA_NACIMIENTO}', paciente.birthday)
  xml = xml.replace('{PESO}', paciente.weight)
  xml = xml.replace('{TALLA}', paciente.size)
  xml = xml.replace('{DIRECCION}', paciente.address)
  xml = xml.replace('{CIUDAD}', paciente.city)
  xml = xml.replace('{TELEFONO_PACIENTE}', paciente.phone)

  //PRESCRIPCIONES
  let str = ''
  if (prescriptions.length > 0) {
    for (let i = 0; i < prescriptions.length; i++) {
      let p = prescriptions[i]
      let xml_prescription = XML_PRESCRIPTION.replace('{CODIGO_MEDICAMENTO}', p.code)
      xml_prescription = xml_prescription.replace('{DOSIS}', p.dose)
      xml_prescription = xml_prescription.replace('{FRECUENCIA}', p.frequency)
      xml_prescription = xml_prescription.replace('{DURACION_DE_LA_INDICACION}', p.length)
      str += xml_prescription
    }
  }
  xml = xml.replace('{PRESCRIPCIONES}', str)

  xml = xml.replace('{DIAGNOSTICO}', object.diagnosis)
  xml = xml.replace('{FECHA_PRESCRIPCION}', new Date().getTime())
  xml = xml.replace('{INDICACIONES_AL_PACIENTE}', object.pacient_detail)
  xml = xml.replace('{INDICACIONES_AL_FARMACEUTICO}', object.farma_detail)
  xml = xml.replace('{CONTRATO_DISPENSACION}', object.contract)

  return xml
}

export function sign(xml, props) {
  let data = SOAP.replace('{DOCUMENT}', btoa(xml))
  data = data.replace('{RUN}', props.run)
  data = data.replace('{RUN}', props.run)
  data = data.replace('{CLAVE}', props.clave)
  return fetch('http://200.111.181.78/SignServerEsign/WSIntercambiaDocSoap', {
    method: 'POST',
    //mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type':  'text/xml;charset=UTF-8',
      'SOAPAction': ''
    },
    body: data
  })
}
