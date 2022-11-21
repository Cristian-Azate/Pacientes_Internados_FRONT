import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography, Box,} from "@mui/material";
import { useState, useEffect,useContext } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { Alert2 } from "./Alert2";

import { vacunapacientecontext } from "../context/vacunapacienteContext";
import { vacunacontext } from "../context/vacunaContext";
import { pacientecontext } from "..//context/pacienteContext";

export function Datos_Paciente_Vacunas() {

  const { paciente } = useContext(pacientecontext);

  const{vacunapaciente, setvacunapaciente,eliminar_vacunapaciente,  lista_vacunapaciente, setlistavacunapaciente,loading,setLoading,crear_vacunapaciente,cargar_vacunapaciente,alertavacunapaciente} = useContext(vacunapacientecontext);

  const{ObtenerID_Vacuna,cargarVacunas,lista_vacunas,setlista_vacunas} = useContext(vacunacontext); 

  const navigate =useNavigate();

  //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>
    setvacunapaciente({ ...vacunapaciente, [e.target.name]: e.target.value });

  const handleDelete = async (id_vacuna_del_paciente) => {
      try {
        eliminar_vacunapaciente(id_vacuna_del_paciente);
        //ELIMINO EN EL FRONT
        setlistavacunapaciente(
          lista_vacunapaciente.filter(
            (vacunapaciente) => vacunapaciente.ID_Vacuna_Administrada !== id_vacuna_del_paciente
          )
        ); //elimino de la lista actual y actualizo la lista
      } catch (error) {
        console.log(error);
      }
  };  

  //Recibo el evento enviar
  //***********CREAR TAREA*****************
  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();
    setLoading(true);
    crear_vacunapaciente(vacunapaciente);
  };

  useEffect(() => {
    if (loading == false & paciente.id_paciente != 0) {
      cargar_vacunapaciente(paciente.id_paciente);
    }
  }, [loading]);

  //cargar lista de vacunas del paciente
  useEffect(() => {
    if (paciente.id_paciente != 0) {
      cargar_vacunapaciente(paciente.id_paciente);
       //Asigno el id del paciente al vacuna_del_paciente
       vacunapaciente.id_paciente = paciente.id_paciente;
    }
   
  }, [paciente.id_paciente ]); //si cambia el dni se carga de nuevo

    //obtener el id de la app al seleccionar
    useEffect(() => {
      if (vacunapaciente.nombre_vacuna !== "") {
        //BUSCO EL ID DE LA OBRA SOCIAL
        ObtenerID_Vacuna(vacunapaciente.nombre_vacuna);
      }
    }, [vacunapaciente.nombre_vacuna]); //si cambia la obra social

  //cargar lista de vacunas
  useEffect(() => {
    cargarVacunas();
  }, []);

  return (
    <>
      <Grid item 
      xs={9}
      md={4}
      lg={4}
     
      mt='1rem'
      >
        <Card
          sx={{
            backgroundColor: "#1e272e",
            padding: "1rem",
            width:"18.5rem"
          }}
          
        >
          <Typography variant="5" textAlign="center" color="white">
            Vacunas Administradas Paciente
          </Typography>
          {lista_vacunapaciente.map((vacuna_del_paciente) => (
            <Box
              key={vacuna_del_paciente.ID_Vacuna_Administrada}
              sx={{
                marginTop: "1rem",
                marginBottom: "0rem",
                backgroundColor: "#1e272e",
                borderRadius: "5px",
              }}
              style={{ borderRadius: "5px", border: "solid #2196f3 1px" }}
            >
              <Grid container rowSpacing={0.2}>
                <Grid item xs={6}>
                  <Typography sx={{ margin: "0.2rem" }} color="white">
                    {vacuna_del_paciente.Nombre_Vacuna}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}          
                >
                 
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(vacuna_del_paciente.ID_Vacuna_Administrada)}
                    sx={{ margin: ".5rem", width: "7.6rem" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ))}
   

          <CardContent>
            <form onSubmit={handleSubmit}>
              {" "}
              {/* utilizara esta funcion para manejar el envio */}
              <TextField
                name="nombre_vacuna"
                variant="outlined"
                select
                label="Vacunas del Paciente"
                value={vacunapaciente.nombre_vacuna}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              
                sx={{
                  marginTop: "1rem",        
                }}
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}  
                fullWidth            
              >       
               {lista_vacunas.map((vacuna) => (
                  <option key={vacuna.ID_Vacuna} value={vacuna.Nombre_Vacuna}>
                    {vacuna.Nombre_Vacuna}
                  </option>
           
                  ))
               }
              
              </TextField> 
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  marginTop: "1rem",
                }}
                //disabled={!paciente.dni_paciente || !paciente.nombre_paciente}
              >
                {loading ? (<CircularProgress color="inherit" size={24} />) : ('Agregar') }
                
              </Button>
            </form>
          </CardContent>
        </Card>
        {alertavacunapaciente ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
      </Grid>
    </>
  );
}
