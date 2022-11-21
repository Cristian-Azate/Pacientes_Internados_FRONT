
import { useContext } from "react";
import {Typography, Box, Grid } from "@mui/material";
import { pacientecontext } from "..//context/pacienteContext";



export function Datos_Paciente() {
  const {paciente} = useContext(pacientecontext); 

  return (
    <Box sx={{ flexGrow: 1 , marginBottom: "1rem"}} >
      {paciente.historia_clinica && 
        <Grid 
          container  
          color="black" 
          style={{ backgroundColor: "#ffffff",borderRadius: "5px", border: "solid #FFFFFF 1px" }} 
        >
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
            >
             <Typography sx={{ margin: "0.2rem" ,fontWeight:"bold"}}>
                DNI:{paciente.dni_paciente}
              </Typography>
            </Grid> 
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
            >
              <Typography sx={{ margin: "0.2rem",fontWeight:"bold"}}>
                Nombre:{paciente.nombre_paciente}
              </Typography>
            </Grid> 
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
            >
               <Typography sx={{ margin: "0.2rem" ,fontWeight:"bold"}}>
                Fecha Nacimiento:{paciente.fecha_nacimiento.replace('T02:00:00.000Z','')}
              </Typography>
            </Grid> 
            <Grid
              item
              xs={12}
              md={3}
              lg={3}
            >
              <Typography sx={{ margin: "0.2rem" ,fontWeight:"bold"}}>
                Historia Clinica:{paciente.historia_clinica}
              </Typography>
            </Grid>      
        </Grid>   
      } 
    </Box>
  );
}