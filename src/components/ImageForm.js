import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";

import { useState, useEffect } from "react";
//para verificar que recibi el parametro dni del paciente
import {useNavigate } from "react-router-dom";
import { Alert2 } from "./Alert2";

import { endpoint } from "./EndPoint";
import DeleteIcon from "@mui/icons-material/Delete";
//import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

export function ImageForm({dni_paciente}) {
  const navigate = useNavigate();

  const ActualizarUrl= async () => {
      await fetch(`${endpoint}/subir_frontal/${dni_paciente}`, {
      method: "PUT",
      body: JSON.stringify(paciente),
      headers: { "Content-Type": "application/json" },
    });
   }

 const ActualizarPaciente=() => {
  setpaciente((paciente) => {
      return {...paciente, urlfrontal:""};
    });
}
 

  const [alerta, setalerta] = useState();

  //al cambiar el valor del impitu file

  //*trae informacion de la url o los aprametros que estamos recibiendo

  const [paciente, setpaciente] = useState({
    dni_paciente: "",
    nombre_paciente: "",
    urlfrontal: "",
  });

  //funcion cargar datos del paciente
  const cargar_datos_paciente = async (dni) => {
    const res = await fetch(
      `${endpoint}/buscar_paciente/${dni}`
    );
    const data = await res.json();
    setpaciente({
      dni_paciente: data.DNI_Paciente,
      nombre_paciente: data.Nombre_Paciente,
      urlfrontal: data.URL_Frontal,
    });
  };

  const handleDelete = async (e) => {
    setalerta(true)

    //saco el nombre del archivo a partir del url
    const nombre_imagen = paciente.urlfrontal.substring(
      49,
      paciente.urlfrontal.length
    );
    
    //debo poner el campo url en blanco
    ActualizarPaciente();

    //luego elimino la imagen en donde se encuentra almacenada
    const resp = await fetch(
      `${endpoint}/api/images/eliminar/${nombre_imagen}`,
      {
        method: "DELETE",
      }
    );
    setalerta(false)
    
  };

  //apenas renderiza si tiene el dni lo busca
  useEffect(() => {
    if (dni_paciente) {
      cargar_datos_paciente(dni_paciente);
    }
  }, [dni_paciente]); //si cambia el dni se carga de nuevo

  useEffect(() => {
    if (paciente.urlfrontal==="") {
      ActualizarUrl();  
    }
  }, [paciente.urlfrontal]); //si cambia el dni se carga de nuevo

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid>
        <Card
          sx={{
            mt: 1,
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <CardContent>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant="5"
                textAlign="center"
                color="#61dafb"
                style={{ display: "inline-block", marginRight: "2rem" }}
              >
                Imagen Frontal 1
              </Typography>   
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ margin: ".5rem", width: "7.6rem" }}
                startIcon={<DeleteIcon />}
              >
                Eliminar
              </Button>
            </Grid>
            <Box
              component="img"
              sx={{
                height: 720,
                width: 1080,
                maxHeight: { xs: 420, md: 1080 },
                maxWidth: { xs: 300, md: 720 },
              }}
              alt="Imagen frontal."
              src={paciente.urlfrontal}
            />
          </CardContent>
        </Card>
      </Grid>
      {alerta && (
        <Alert2 titulo={"Aviso"} mensaje={"Imagen Eliminada Exitosamente"} />
      )}
    </Grid>
  );
}
