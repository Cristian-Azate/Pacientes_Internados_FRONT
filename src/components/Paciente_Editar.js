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
//para verificar que recibi el parametro dni del paciente
import { useParams } from "react-router-dom";

import { Alert2 } from "./Alert2";

import { obrasocialcontext } from "..//context/obrasocialContext";
import { pacientecontext } from "..//context/pacienteContext";

export default function Paciente_Editar() {
  //*trae informacion de la url o los aprametros que estamos recibiendo
  const params = useParams();

  const{ObtenerID_Obra_Social,Obtener_Obra_Social,cargarObras_Sociales,lista_obras_sociales,setlista_obras_sociales} = useContext(obrasocialcontext); 
  const{paciente,setpaciente,cargar_datos_paciente,modificar_paciente,alerta,setAlerta,limpiar_paciente,loading,setLoading} = useContext(pacientecontext); 
  //apenas renderiza el elemento
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>{
    setpaciente({ ...paciente, [e.target.name]: e.target.value });
  }

  //Recibo el evento enviar
  //***********CREAR EDITAR PACIENTE*****************
  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();
    setLoading(true);
    modificar_paciente(params.dni)
  };

  useEffect(() => {
    cargarObras_Sociales();
  }, []);

  useEffect(() => {
    if (paciente.id_obra_social!==0) {
        //BUSCO EL NOMBRE DE LA OBRA SOCIAL
      Obtener_Obra_Social(paciente.id_obra_social)
    }
  }, [paciente.id_obra_social]); //si cambia el dni se carga de nuevo

   //apenas renderiza si tiene el dni lo busca
   useEffect(() => {
    if (params.dni) {
      cargar_datos_paciente(params.dni);
    }
  }, [params.dni]); //si cambia el dni se carga de nuevo

 useEffect(() => {
    if (paciente.obra_social!=="") {
        //BUSCO EL ID DE LA OBRA SOCIAL
    ObtenerID_Obra_Social(paciente.obra_social)
    }
  }, [paciente.obra_social]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    
    >
      <Grid item xs={3}>
        <Card
          sx={{
            mt: 10,
            backgroundColor: "#1e272e",
            padding: "1rem",
       
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Editar Paciente
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {" "}
              {/* utilizara esta funcion para manejar el envio */}
              <TextField
                name="dni_paciente"
                value={paciente.dni_paciente}
                onChange={handleChange}
                variant="outlined"
                label="DNI del paciente"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <TextField
                name="nombre_paciente"
                value={paciente.nombre_paciente}
                onChange={handleChange}
                variant="outlined"
                label="Nombre del Paciente"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
                <TextField
                name="fecha_nacimiento"
                value={paciente.fecha_nacimiento.replace('T02:00:00.000Z','')}
                onChange={handleChange}
                variant="outlined"
                label="Fecha Nacimiento"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}
                type="date"               
              />

              <TextField
                name="historia_clinica"
                value={paciente.historia_clinica}
                onChange={handleChange}
                variant="outlined"
                label="Nº Historia Clinica"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" }}}
              />

              <TextField
                name="obra_social"
                variant="outlined"
                select
                label="Obra Social"
                value={paciente.obra_social}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              
                sx={{
                  marginTop: "1rem",
                  width:"24ch"
                }}
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}              
              >       
               {lista_obras_sociales.map((obra_social) => (
                  <option key={obra_social.ID_Obra_Social} value={obra_social.Nombre_Obra_Social}>
                    {obra_social.Nombre_Obra_Social}
                  </option>
           
                  ))
               }
              
              </TextField>  
              <TextField
                name="telefono"
                value={paciente.telefono}
                onChange={handleChange}
                variant="outlined"
                label="Telefono"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <Card
              sx={{
                mt: 0,     
                backgroundColor: "#1e272e",
                padding: "1rem",              
                border: "solid #FFFFFF 1px"  ,  
                borderRadius:"15px" 
              }}
            >
               <Typography variant="5" textAlign="center" color="white">
                 Domicilio
               </Typography>
               <TextField
                name="calle"
                value={paciente.calle}
                onChange={handleChange}
                variant="outlined"
                label="Calle"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <TextField
                name="barrio"
                value={paciente.barrio}
                onChange={handleChange}
                variant="outlined"
                label="Barrio"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <TextField
              name="localidad"
              value={paciente.localidad}
              onChange={handleChange}
              variant="outlined"
              label="Localidad"
              sx={{
                display: "block",
                marginTop: "1rem",
                marginLeft: "1rem",
              }}
              inputProps={{ sx: { color: "White" } }}
              InputLabelProps={{ sx: { color: "#028dff" } }}
            />
            </Card>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "1rem",
                }}
                disabled={!paciente.dni_paciente || !paciente.nombre_paciente}
                fullWidth
              >
                {loading ? (<CircularProgress color="inherit" size={24} />) : ("Editar")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {alerta ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
    </Grid>
  );
}
