import { Card, CardContent, Grid, Typography } from "@mui/material";

import { useState, useEffect } from "react";
//para verificar que recibi el parametro dni del paciente
import { useParams } from "react-router-dom";
import { Alert2 } from "./Alert2";
import { ImageForm } from "./ImageForm";
import { ImageUpload } from "./ImageUpload";

import { endpoint } from "./EndPoint";

export default function Image() {
  const [alerta, setalerta] = useState();

  //*trae informacion de la url o los aprametros que estamos recibiendo
  const params = useParams();

  const [paciente, setpaciente] = useState({
    dni_paciente: "",
    nombre_paciente: "",
    urlfrontal: null,
  });

  //funcion cargar datos del paciente
  const cargar_datos_paciente = async (dni) => {
    const res = await fetch(`${endpoint}/buscar_paciente/${dni}`);
    const data = await res.json();
    setpaciente({
      dni_paciente: data.DNI_Paciente,
      nombre_paciente: data.Nombre_Paciente,
      urlfrontal: data.URL_Frontal,
    });
    //Mensaje de Alerta
    if (data.URL_Frontal === "" || data.URL_Frontal === null) {
      setalerta(true);
    } else setalerta(false);
  };

  //apenas renderiza si tiene el dni lo busca
  useEffect(() => {
    if (params.dni) {
      cargar_datos_paciente(params.dni);
    }
  }, [params.dni]); //si cambia el dni se carga de nuevo

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
            mt: 11,
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <CardContent>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant="5"
                textAlign="center"
                color="white"
                style={{ display: "inline-block" }}
              >
                NOMBRE:{paciente.nombre_paciente}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {alerta && (
        <Alert2
          titulo={"Aviso"}
          mensaje={"El paciente no tiene imagen del DNI"}
        />
      )}
      {alerta ? <ImageUpload dni_paciente={paciente.dni_paciente} /> : <ImageForm dni_paciente={paciente.dni_paciente} />}
    </Grid>
  );
}