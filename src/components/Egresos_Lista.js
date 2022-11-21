import React, { useContext } from "react";
import { useEffect } from "react";
import { Button, Typography, Box, Grid,TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OutboundIcon from "@mui/icons-material/Outbound";
import DeleteIcon from "@mui/icons-material/Delete";


import { egresocontext } from "../context/egresoContext";

export function Egresos_Lista() {
  //funcion para navegar recibe url
  const navigate = useNavigate();

  const {searchedEgresos,cargar_egresos,fecha_desde,fecha_hasta,setfechadesde,setfechahasta,eliminar_egreso,lista_egresos,setlistaegresos} = useContext(egresocontext); 

  const handleChangedesde = (e) =>{
    setfechadesde(e.target.value);
    }

  const handleChangehasta = (e) =>{
    setfechahasta(e.target.value);
    }

  const handleDelete = async (id_egreso) => {
      try {
        eliminar_egreso(id_egreso);
        //ELIMINO EN EL FRONT
        setlistaegresos(
          lista_egresos.filter(
            (egreso) => egreso.ID_Egreso !== id_egreso
          )
        ); //elimino de la lista actual y actualizo la lista
         
      } catch (error) {
        console.log(error);
      }
    };

  let date = new Date();

  //RECIBE UNA FUNCION COMO UN PARAMETRO y un ARREGLO para ejecutar la funcion - esta funcion se ejecuta cuando el componente se renderiza por primera vez o se actualice
  useEffect(() => {
    cargar_egresos();
  }, []);
  return (
    <>
      <Grid sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h5">Lista Egresos</Typography>
      </Grid>
      {searchedEgresos.map((egreso) => (
        <Box
          key={egreso.ID_Egreso}
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
              md={5}
              lg={5}
              style={{ borderRadius: "5px", border: "solid #FFFFFF 1px" }}
            >
              <Typography sx={{ margin: "0.2rem" }}>
                Fecha Egreso: {egreso.Fecha_Egreso.replace('T03:00:00.000Z','')}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Hora Egreso: {egreso.Hora_Egreso.replace(':00','')}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Tipo Egreso: {egreso.Tipo_Egreso}
              </Typography>

              <Typography sx={{ margin: "0.2rem" ,marginTop:"1.5rem"}}>
                DNI: {egreso.DNI_Paciente}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Nombre: {egreso.Nombre_Paciente}
              </Typography>
            </Grid>  
            
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              style={{ backgroundColor: "#1e272e" }}
            > 
             {egreso.ID_Condicion && 
               <Button
               variant="contained"
               color="secondary"
               onClick={() => navigate(`/editar_condicion_paciente_egreso/${egreso.DNI_Paciente}/${egreso.ID_Condicion}`)}
               sx={{ margin: ".5rem" }}
               startIcon={<ContentPasteIcon />}
             >
               VER Condicion del Paciente            
             </Button> 
             }
             {!egreso.ID_Condicion && 
               <Button
               variant="contained"
               color="secondary"
               onClick={() => navigate(`/condicion_paciente_egreso/nuevo/${egreso.DNI_Paciente}/${egreso.ID_Egreso}`)}
               sx={{ margin: ".5rem" }}
               startIcon={<ContentPasteIcon />}
             >
               Condicion del Paciente            
             </Button> 
             }
            
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(`/ingreso/${egreso.DNI_Paciente}/editar/${egreso.ID_Ingreso}`)}
                sx={{ margin: ".5rem" }}
                startIcon={<OutboundIcon />}
              >
                VER Ingreso del Paciente
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
                  navigate(`/ingreso/${egreso.DNI_Paciente}/editar/${egreso.ID_Egreso}`)
                }
                sx={{ margin: ".5rem", color: "black", width: "7.6rem" }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(egreso.ID_Egreso)}
                sx={{ margin: ".5rem", width: "7.6rem" }}
                startIcon={<DeleteIcon />}
                disabled={egreso.ID_Condicion}
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