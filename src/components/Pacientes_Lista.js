import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from "@mui/icons-material/Collections";
import OutboundIcon from "@mui/icons-material/Outbound";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Search_bar } from "./Search_bar";

import { pacientecontext } from "..//context/pacienteContext";

export default function Pacientes_Lista() {
  //funcion para navegar recibe url
  const navigate = useNavigate();

  const {paciente,setpaciente, cargar_pacientes ,lista_pacientes,setlistapacientes,eliminar_paciente,modificar_paciente,limpiar_paciente} = useContext(pacientecontext); 

  //funcion eliminar paciente
  const handleDelete = async (dni_paciente) => {
    try {
      eliminar_paciente(dni_paciente);
      //ELIMINO EN EL FRONT
      setlistapacientes(
        lista_pacientes.filter(
          (paciente) => paciente.DNI_Paciente !== dni_paciente
        )
      ); //elimino de la lista actual y actualizo la lista
    } catch (error) {
      console.log(error);
    }
  };

  //RECIBE UNA FUNCION COMO UN PARAMETRO y un ARREGLO para ejecutar la funcion - esta funcion se ejecuta cuando el componente se renderiza por primera vez o se actualice
  useEffect(() => {
    limpiar_paciente();
    cargar_pacientes();
  }, []);
  return (
    <>
      <Grid sx={{ marginTop: "7rem", marginBottom: "1rem" }}>
        <Search_bar />
        <Typography variant="h5">Lista Pacientes</Typography>
      </Grid>
      {lista_pacientes.map((paciente) => (
        <Box
          key={paciente.DNI_Paciente}
          sx={{
            marginBottom: "1rem",
            backgroundColor: "#1e272e",
            borderRadius: "5px",
          }}
        >
          <Grid container rowSpacing={0.2}>
            <Grid
              item
              xs={12}
              md={3}
              lg={2}
              style={{ borderRadius: "5px", border: "solid #FFFFFF 1px" }}
            >
              <Typography sx={{ margin: "0.2rem" }}>
                DNI:{paciente.DNI_Paciente}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Nombre:{paciente.Nombre_Paciente}
              </Typography>

              <Button
                variant="contained"
                color="info"
                onClick={() =>
                  navigate(`/ver_imagen_frontal/${paciente.DNI_Paciente}`)
                }
                sx={{ margin: ".5rem", width: "7.6rem" }}
                startIcon={<CollectionsIcon />}
              >
                Ver DNI
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={7}
              style={{ backgroundColor: "#1e272e" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/ingreso/nuevo")}
                sx={{ margin: ".5rem" }}
                startIcon={<EnhancedEncryptionIcon />}
              >
                Ingresos
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate("/egreso/nuevo")}
                sx={{ margin: ".5rem" }}
                startIcon={<OutboundIcon />}
              >
                Egresos
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/condicion_paciente/nuevo")}
                sx={{ margin: ".5rem" }}
                startIcon={<ContentPasteIcon />}
              >
                Condicion
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate("/servicio_social/nuevo")}
                sx={{ margin: ".5rem" }}
                startIcon={<AccessibilityIcon />}
              >
                Servicios Sociales
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              lg={3}
              style={{
                backgroundColor: "grey",
                borderRadius: "5px",
                border: "solid #FFFFFF 1px",
              }}
            >
              <Button
                variant="contained"
                color="inherit"
                onClick={() =>
                  navigate(`/paciente/${paciente.DNI_Paciente}/editar`)
                }
                sx={{ margin: ".5rem", color: "black", width: "7.6rem" }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(paciente.DNI_Paciente)}
                sx={{ margin: ".5rem", width: "7.6rem" }}
                startIcon={<DeleteIcon />}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
