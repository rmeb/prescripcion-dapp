# prescripcion-dapp
dApp para prescribir recetas medicas

## XML Receta de ejemplo:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<RME>
	<ESTABLECIMIENTO_SALUD>
		<NOMBRE/>
		<CODIGO_DEIS/>
		<TELEFONO/>
		<EMAIL/>
		<DIRECCION>
			<CALLE/>
			<NUMERO/>
			<DEPARTAMENTO/>
			<COMUNA/>
		</DIRECCION>
	</ESTABLECIMIENTO_SALUD>
	<PROFESIONAL_PRESCRIPTOR>
		<NOMBRE/>
		<DOCUMENTO_IDENTIFICACION/>
		<NUMERO_DOCUMENTO/>
		<PROFESION/>
		<NUMERO_REGISTRO_PRESTADORES_INDIVIDUALES_SI_SALUD/>
		<NUMERO_REGISTRO_COLEGIO_PROFESIONAL/>
	</PROFESIONAL_PRESCRIPTOR>
	<PACIENTE>
		<NOMBRE/>
		<DOCUMENTO_IDENTIFICACION/>
		<NUMERO_DOCUMENTO/>
		<FECHA_NACIMIENTO/> //DD-MM-YYYY
		<PESO/> //KK.GG
		<TALLA/> //
		<DIRECCION/>
		<CIUDAD/>
		<TELEFONO/>
	</PACIENTE>
	<PRESCRIPCIONES>
	        <PRESCRIPCION>
		           <CODIGO_MEDICAMENTO/> //Tabla de carga: Codigo Medicamento
		           <DOSIS/> //Numero: 3
		           <FRECUENCIA/> //Numero (en horas). "Cada X horas".
		           <DURACION_DE_LA_INDICACION/> //Numero (en dias). "Por Y dias"
	        </PRESCRIPCION>
	</PRESCRIPCIONES>
	<DIAGNOSTICO/> //Texto libre
	<FECHA_PRESCRIPCION/> //Timestamp
	<INDICACIONES_AL_PACIENTE/> //Texto libre
	<INDICACIONES_AL_FARMACEUTICO/> //Texto libre		
    <CONTRATO_DISPENSACION/> //Direccion en el blockchain del contrato de dispensacion
</RME>
```

## Servicio de Firma

Una vez armado el XML de la receta, esta se envia a firmar al servicio de firma. Los paramteros requeridos para el servicio de firma son:

| Campo                          | Dato a ingresar        |
|--------------------------------|------------------------|
| Encabezado.User                | RUT del firmador       |
| EncabezadoPassword             | Clave del firmador     |
| Encabezado.NombreConfiguracion | RUT del firmador       |
| Parametro.Documento            | XML a firmar en Base64 |

Ejemplo de llamada:

```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.signserver.esign.com/">
  <soapenv:Header/>
  <soapenv:Body>
     <ws:intercambiaDoc>
        <!--Optional:-->
        <Encabezado>
           <User>1-9</User>
           <Password>password1234*</Password>
           <NombreConfiguracion>1-9</NombreConfiguracion>
        </Encabezado>
        <!--Optional:-->
        <Parametro>
           <Documento>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4gDQo8Uk1FPg0KCTxFU1RBQkxFQ0lNSUVOVE9fU0FMVUQ+DQoJCTxOT01CUkUvPg0KCQk8Q09ESUdPX0RFSVMvPg0KCQk8VEVMRUZPTk8vPg0KCQk8RU1BSUwvPg0KCQk8RElSRUNDSU9OPg0KCQkJPENBTExFLz4NCgkJCTxOVU1FUk8vPg0KCQkJPERFUEFSVEFNRU5UTy8+DQoJCQk8Q09NVU5BLz4NCgkJPC9ESVJFQ0NJT04+DQoJPC9FU1RBQkxFQ0lNSUVOVE9fU0FMVUQ+DQoJPFBST0ZFU0lPTkFMX1BSRVNDUklQVE9SPg0KCQk8Tk9NQlJFLz4NCgkJPERPQ1VNRU5UT19JREVOVElGSUNBQ0lPTi8+DQoJCTxOVU1FUk9fRE9DVU1FTlRPLz4NCgkJPFBST0ZFU0lPTi8+DQoJCTxOVU1FUk9fUkVHSVNUUk9fUFJFU1RBRE9SRVNfSU5ESVZJRFVBTEVTX1NJX1NBTFVELz4NCgkJPE5VTUVST19SRUdJU1RST19DT0xFR0lPX1BST0ZFU0lPTkFMLz4NCgk8L1BST0ZFU0lPTkFMX1BSRVNDUklQVE9SPg0KCTxQQUNJRU5URT4NCgkJPE5PTUJSRS8+DQoJCTxET0NVTUVOVE9fSURFTlRJRklDQUNJT04vPg0KCQk8TlVNRVJPX0RPQ1VNRU5UTy8+DQoJCTxGRUNIQV9OQUNJTUlFTlRPLz4gLy9ERC1NTS1ZWVlZDQoJCTxQRVNPLz4gLy9LSy5HRw0KCQk8VEFMTEEvPiAvLw0KCQk8RElSRUNDSU9OLz4gDQoJCTxDSVVEQUQvPiANCgkJPFRFTEVGT05PLz4NCgk8L1BBQ0lFTlRFPg0KCTxQUkVTQ1JJUENJT05FUz4NCgkgICAgICAgIDxQUkVTQ1JJUENJT04+DQoJCSAgICAgICAgICAgPENPRElHT19NRURJQ0FNRU5UTy8+IC8vVGFibGEgZGUgY2FyZ2E6IENvZGlnbyBNZWRpY2FtZW50bw0KCQkgICAgICAgICAgIDxET1NJUy8+IC8vTnVtZXJvOiAzDQoJCSAgICAgICAgICAgPEZSRUNVRU5DSUEvPiAvL051bWVybyAoZW4gaG9yYXMpLiAiQ2FkYSBYIGhvcmFzIi4NCgkJICAgICAgICAgICA8RFVSQUNJT05fREVfTEFfSU5ESUNBQ0lPTi8+IC8vTnVtZXJvIChlbiBkaWFzKS4gIlBvciBZIGRpYXMiDQoJICAgICAgICA8L1BSRVNDUklQQ0lPTj4NCgk8L1BSRVNDUklQQ0lPTkVTPg0KCTxESUFHTk9TVElDTy8+IC8vVGV4dG8gbGlicmUNCgk8RkVDSEFfUFJFU0NSSVBDSU9OLz4gLy9UaW1lc3RhbXANCgk8SU5ESUNBQ0lPTkVTX0FMX1BBQ0lFTlRFLz4gLy9UZXh0byBsaWJyZQ0KCTxJTkRJQ0FDSU9ORVNfQUxfRkFSTUFDRVVUSUNPLz4gLy9UZXh0byBsaWJyZQkJDQogICAgPENPTlRSQVRPX0RJU1BFTlNBQ0lPTi8+IC8vRGlyZWNjaW9uIGVuIGVsIGJsb2NrY2hhaW4gZGVsIGNvbnRyYXRvIGRlIGRpc3BlbnNhY2lvbg0KPC9STUU+</Documento>
           <NombreDocumento></NombreDocumento>
           <MetaData></MetaData>
        </Parametro>
     </ws:intercambiaDoc>
  </soapenv:Body>
</soapenv:Envelope>
```

Endpoint:

`http://200.111.181.78/SignServerEsign/WSIntercambiaDocSoap?wsdl`

## Usuario de prueba
Rut: 99551740-K
Clave: 1234
