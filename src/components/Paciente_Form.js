import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import { useState,useEffect,useContext } from "react";
import { pacientecontext } from "..//context/pacienteContext";
import { obrasocialcontext } from "..//context/obrasocialContext";
import { Alert2 } from "./Alert2";

export default function Paciente_Form() {
  const{paciente,setpaciente,crear_paciente,loading,setLoading,limpiar_paciente} = useContext(pacientecontext); 
  const{ObtenerID_Obra_Social,cargarObras_Sociales,lista_obras_sociales,setlista_obras_sociales,alerta} = useContext(obrasocialcontext); 

  //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>
    setpaciente({ ...paciente, [e.target.name]: e.target.value });
   

  //Recibo el evento enviar
  //***********CREAR PACIENTE*****************
  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();
    setLoading(true)
    crear_paciente(paciente);
  };

  
  //RECIBE UNA FUNCION COMO UN PARAMETRO y un ARREGLO para ejecutar la funcion - esta funcion se ejecuta cuando el componente se renderiza por primera vez o se actualice
  useEffect(() => {
    cargarObras_Sociales();
    limpiar_paciente();
  }, []);

  useEffect(() => {
    if (paciente.obra_social!=="") {
        //BUSCO EL ID DE LA OBRA SOCIAL
    ObtenerID_Obra_Social(paciente.obra_social)
    }
  }, [paciente.obra_social]); //si cambia la obra social

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{marginTop:"4.5rem"}}
    >
      <Grid item xs={3}>
        <Card
          sx={{
            mt: 5,
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Crear Paciente
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
        
              {/* utilizara esta funcion para manejar el envio */}
              <TextField
                name="dni_paciente"
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
                onChange={handleChange}
                variant="outlined"
                label="Fecha Nacimiento"
                value={paciente.fecha_nacimiento.replace('T03:00:00.000Z','')}
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
                onChange={handleChange}
                variant="outlined"
                label="Nº Historia Clinica"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
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
                fullWidth
              >
                {loading ? (<CircularProgress color="inherit" size={24} />) : ('Guardar') }
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {alerta ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
    </Grid>
  );
}
