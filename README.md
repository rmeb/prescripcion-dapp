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