import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";


import { appacientecontext } from "../context/appacienteContext";
import { appcontext } from "../context/appContext";
import { pacientecontext } from "..//context/pacienteContext";

import { Alert2 } from "./Alert2";

export function Datos_Paciente_APP() {
  
  const { paciente } = useContext(pacientecontext);

  const {appaciente,cargar_appaciente,setappaciente,lista_appaciente,loading,setLoading,crear_appaciente,eliminar_apppaciente,setlistaappaciente,alertaapppaciente} = useContext(appacientecontext);

  const { ObtenerID_APP, cargarAPPS, lista_apps, setlista_apps } = useContext(appcontext);

  const navigate = useNavigate();

  //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>
    setappaciente({ ...appaciente, [e.target.name]: e.target.value });

  const handleDelete = async (id_app_del_paciente) => {
      try {
        eliminar_apppaciente(id_app_del_paciente);
        //ELIMINO EN EL FRONT
        setlistaappaciente(
          lista_appaciente.filter(
            (appaciente) => appaciente.ID_Antecedente_Patologico_de_Pacientes !== id_app_del_paciente
          )
        ); //elimino de la lista actual y actualizo la lista
      } catch (error) {
        console.log(error);
      }
  };

  //Recibo el evento enviar
  //***********CREAR APP PACIENTE*****************
  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();
    setLoading(true);
    crear_appaciente(appaciente);
  }
  
  useEffect(() => {
    if (loading == false & paciente.id_paciente != 0) {
      cargar_appaciente(paciente.id_paciente);
    }
  }, [loading]);

  //cargar listado de app del paciente
  useEffect(() => {
    if (paciente.id_paciente != 0) {
      cargar_appaciente(paciente.id_paciente);
      //Asigno el id del paciente al app_del_paciente
      appaciente.id_paciente = paciente.id_paciente;
    }
  }, [paciente.id_paciente]);

  //obtener el id de la app al seleccionar
  useEffect(() => {
    if (appaciente.nombre_app !== "") {
      //BUSCO EL ID DE LA OBRA SOCIAL
      ObtenerID_APP(appaciente.nombre_app);
    }
  }, [appaciente.nombre_app]); //si cambia la obra social

  //cargar listado de app
  useEffect(() => {
    cargarAPPS();
  }, []);

  return (
    <>
      <Grid item xs={9} md={4} lg={4} mt="1rem">
        <Card
          sx={{
            backgroundColor: "#1e272e",
            padding: "1rem",
            width: "18.5rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Enfermedades Base del Paciente
          </Typography>
          {lista_appaciente.map((app_del_paciente) => (
            <Box
              key={app_del_paciente.ID_Antecedente_Patologico_de_Pacientes}
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
                    {app_del_paciente.Nombre_APP}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}          
                >
                 
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(app_del_paciente.ID_Antecedente_Patologico_de_Pacientes)}
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
                name="nombre_app"
                variant="outlined"
                select
                label="Enfermedad Base"
                value={appaciente.nombre_app}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                sx={{
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "#028dff" }, shrink: true }}
                fullWidth 
              >
                {lista_apps.map((app) => (
                  <option key={app.ID_APP} value={app.Nombre_APP}>
                    {app.Nombre_APP}
                  </option>
                ))}
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
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Agregar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        {alertaapppaciente ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
      </Grid>
    </>
  );
}
