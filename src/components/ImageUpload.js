import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Input,
} from "@mui/material";

import { useState,useEffect,useContext } from "react";
//para verificar que recibi el parametro dni del paciente
import { Alert2 } from "./Alert2";

import { endpoint } from "./EndPoint";



export function ImageUpload({dni_paciente}) {
  const[loading,setLoading] = useState(false);


  //accedo del valor del ESTADO ACTUAL DENTRO DEL ACTUALIZADOR
  const ActualizarUrl= async () => {
    await fetch(`${endpoint}/subir_frontal/${paciente.dni_paciente}`, {
      method: "PUT",
      body: JSON.stringify(paciente),
      headers: { "Content-Type": "application/json" },
    });
   }

  const ActualizarPaciente=(data) => {//fusiono el estado del paciente con este nuevo valor del campo
    setpaciente((paciente) => {
        return {...paciente, urlfrontal:data};
      });
  }

  //para guardar la imagen
  const [file, setfile] = useState();

  //al cambiar el valor del impitu file
  const handleChange = (e) => {
    setfile(e.target.files[0]);
  };
  //button subir iamgen
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //para colorcar la informacion en un objeto que contiene varios state
    const formData = new FormData();

    //agregar un campo
    formData.append("file", file);

    const resp = await fetch(`${endpoint}/api/images/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await resp.json();

    if (data !== "Error") {
      //YA SUBI LA IMAGEN AHORA DEBO MODIFICAR EL CAMPO URL DEL PACIENTE QUE APUNTE A SU IMAGEN
      ActualizarPaciente(data);
      //console.log(paciente.urlfrontal)      
      //const data2 = await resp2.json();
      //Mensaje de Retorno si se guardo
      //console.log(data2);
      setLoading(false);  
    }
  };

  //*trae informacion de la url o los aprametros que estamos recibiendo
  
  const [paciente, setpaciente] = useState({
    dni_paciente: "",
    nombre_paciente: "",
    urlfrontal: "",
  });

  const cargar_datos_paciente = async (dni) => {
    const res = await fetch(`${endpoint}/buscar_paciente/${dni}`);
    const data = await res.json();
    setpaciente({
      dni_paciente: data.DNI_Paciente,
      nombre_paciente: data.Nombre_Paciente,  
    });
  };

  //funcion cargar datos del paciente
  useEffect(() => {
    if (dni_paciente) {
      cargar_datos_paciente(dni_paciente);
    }
  }, [dni_paciente]); //si cambia el dni se carga de nuevo
  
  useEffect(() => {
    if (paciente.urlfrontal!=="") {
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
                sx={{ display: "inline-block" }}
              >
                Imagen Frontal 1
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Input
                inputProps={{ sx: { color: "White" } }}
                type="file"
                sx={{ marginTop: "0.5rem" }}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "0.5rem",
                }}
                fullWidth
                onClick={handleSubmit}
              >
                Subir Imagen
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {loading && (
        <Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />
      )}
    </Grid>
  );
}
