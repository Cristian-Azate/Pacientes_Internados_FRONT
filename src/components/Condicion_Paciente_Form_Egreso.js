import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect, useContext } from "react";
  import { Navigate, useNavigate } from "react-router-dom";
  import { useParams } from "react-router-dom";
  
  import { Datos_Paciente } from "./Datos_Paciente";
  import { Datos_Paciente_APP } from "./Datos_Paciente_APP";
  import { Datos_Paciente_Vacunas } from "./Datos_Paciente_Vacunas";
  
  import { pacientecontext } from "..//context/pacienteContext";
  import { diagnosticocontext } from "..//context/diagnosticoContext";
  import { condicionpacientecontext } from "..//context/condicionpacienteContext";
  
  import { Alert2 } from "./Alert2";
  
  export default function Condicion_Paciente_Form_Egreso() {
     //*trae informacion de la url o los aprametros que estamos recibiendo
     const params = useParams();
  
     const {cargar_datos_paciente,paciente} = useContext(pacientecontext);
   
     const {condicionpaciente, setcondicionpaciente,loading,setLoading,crear_condicionpaciente_ingreso,alertacondicionpaciente,limpiar_condicionpaciente_para_egreso} = useContext(condicionpacientecontext);
   
     const {ObtenerID_Diagnostico,cargarDiagnosticos,lista_diagnosticos} = useContext(diagnosticocontext);
   
     const navigate = useNavigate();
   
    
   
     //recibo el evento onchange para cualquier onchange de los campos
     const handleChange = (e) =>{
     setcondicionpaciente({ ...condicionpaciente, [e.target.name]: e.target.value });
    }
   
     //Recibo el evento enviar
     //***********CREAR TAREA*****************
     const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      crear_condicionpaciente_ingreso(condicionpaciente); 
     };
   
   
     //cargo los datos del paciente al recibir el parametro
     useEffect(() => {
       if (params.dni) {
         cargar_datos_paciente(params.dni);
       }
     }, [params.dni]); //si cambia el dni se carga de nuevo
   
     useEffect(() => {
       if (condicionpaciente.nombre_diagnostico !== "") {
         //BUSCO EL ID DEL DIAGNOSTICO
         ObtenerID_Diagnostico(condicionpaciente.nombre_diagnostico);
       }
     }, [condicionpaciente.nombre_diagnostico]); //si cambia la obra social
   
     //CARGO LISTA DE DIAGNOSTICOS
     useEffect(() => {
       cargarDiagnosticos();
       limpiar_condicionpaciente_para_egreso();
     }, []);
   
     //al recibir los parametros actualizo la condicion
     useEffect(() => {
       if (paciente.id_paciente!=0 ) {
         condicionpaciente.id_paciente=paciente.id_paciente;
         condicionpaciente.id_egreso=params.id_egreso;
       }
     }, [paciente.id_paciente]);
   
     return (
       <>
         <Grid sx={{ marginTop: "6.5rem" }}>
           <Datos_Paciente></Datos_Paciente>
         </Grid>
   
         <Grid container>
           <Datos_Paciente_APP></Datos_Paciente_APP>
           <Datos_Paciente_Vacunas></Datos_Paciente_Vacunas>
         </Grid>
   
         <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           sx={{ marginTop: "0rem" }}
         >
           <Grid item xs={3}>
             <Card
               sx={{
                 mt: 5,
                 backgroundColor: "#1e272e",
                 padding: "1rem",
                 width:"18.5rem"
               }}
             >
               <Typography variant="5" textAlign="center" color="white">
                 Condicion Egreso Paciente
               </Typography>
               <CardContent>
                 <form onSubmit={handleSubmit}>
                   {" "}
                   {/* utilizara esta funcion para manejar el envio */}
                   <TextField
                   fullWidth
                     name="nombre_diagnostico"
                     variant="outlined"
                     select
                     label="Diagnostico de Ingreso"
                     value={condicionpaciente.nombre_diagnostico}
                     onChange={handleChange}
                     SelectProps={{
                       native: true,
                     }}
                     sx={{
                       marginTop: "1rem",
                       
                     }}
                     inputProps={{ sx: { color: "white" } }}
                     InputLabelProps={{ sx: { color: "#028dff" }, shrink: true }}
                     
                   >
                     {lista_diagnosticos.map((diagnostico) => (
                       <option
                         key={diagnostico.ID_Diagnostico}
                         value={diagnostico.Nombre_Diagnostico}
                       >
                         {diagnostico.Nombre_Diagnostico}
                       </option>
                     ))}
                   </TextField>
                   <TextField
                     name="frecuencia_cardiaca"
                     variant="outlined"
                     label="Frecuencia Cardiaca"
                     value={condicionpaciente.frecuencia_cardiaca}
                     onChange={handleChange}
                     sx={{
                       display: "block",
                       marginTop: "1rem",
                     }}
                     inputProps={{ sx: { color: "White" } }}
                     InputLabelProps={{ sx: { color: "#028dff" } }}
                     fullWidth
                   />
                   <TextField
                     name="frecuencia_respiratoria"
                     variant="outlined"
                     label="Frecuencia Respiratoria"
                     value={condicionpaciente.frecuencia_respiratoria}
                     onChange={handleChange}
                     sx={{
                       display: "block",
                       marginTop: "1rem",
                     }}
                     inputProps={{ sx: { color: "White" } }}
                     InputLabelProps={{ sx: { color: "#028dff" } }}
                     fullWidth
                   />
                   <TextField
                     name="tension_arterial"
                     variant="outlined"
                     label="Tension Arterial"
                     value={condicionpaciente.tension_arterial}
                     onChange={handleChange}
                     sx={{
                       display: "block",
                       marginTop: "1rem",
                     }}
                     inputProps={{ sx: { color: "White" } }}
                     InputLabelProps={{ sx: { color: "#028dff" } }}
                     fullWidth
                   />
                   <TextField
                     name="saturacion"
                     variant="outlined"
                     label="Saturacion"
                     value={condicionpaciente.saturacion}
                     onChange={handleChange}
                     sx={{
                       display: "block",
                       marginTop: "1rem",
                     }}
                     inputProps={{ sx: { color: "White" } }}
                     InputLabelProps={{ sx: { color: "#028dff" } }}
                     fullWidth
                   />
                   <TextField
                     name="temperatura"
                     variant="outlined"
                     label="Temperatura"
                     value={condicionpaciente.temperatura}
                     onChange={handleChange}
                     sx={{
                       display: "block",
                       marginTop: "1rem",
                     }}
                     inputProps={{ sx: { color: "White" } }}
                     InputLabelProps={{ sx: { color: "#028dff" } }}
                     fullWidth
                   />
                   <Button
                     variant="contained"
                     color="primary"
                     type="submit"
                     sx={{
                       marginTop: "1rem",
                     }}
                     disabled={!paciente.id_paciente}
                     fullWidth
                   >
                     {loading ? (
                       <CircularProgress color="inherit" size={24} />
                     ) : (
                       "Guardar"
                     )}
                   </Button>
                 </form>
               </CardContent>
             </Card>
           </Grid>
          {alertacondicionpaciente ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  } 
         </Grid>
       </>
     );
  }
  