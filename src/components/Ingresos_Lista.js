import React, { useContext } from "react";
import { useEffect } from "react";
import { Button, Typography, Box, Grid,TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OutboundIcon from "@mui/icons-material/Outbound";
import DeleteIcon from "@mui/icons-material/Delete";


import { ingresocontext } from "../context/ingresoContext";

export function Ingresos_Lista() {
  //funcion para navegar recibe url
  const navigate = useNavigate();

  const {searchedIngresos,cargar_ingresos,fecha_desde,fecha_hasta,setfechadesde,setfechahasta,eliminar_ingreso,lista_ingresos,setlistaingresos} = useContext(ingresocontext); 

  const handleChangedesde = (e) =>{
    setfechadesde(e.target.value);
    }

  const handleChangehasta = (e) =>{
    setfechahasta(e.target.value);
    }

  const handleDelete = async (id_ingreso) => {
      try {
        eliminar_ingreso(id_ingreso);
        //ELIMINO EN EL FRONT
        setlistaingresos(
          lista_ingresos.filter(
            (ingreso) => ingreso.ID_Ingreso !== id_ingreso
          )
        ); //elimino de la lista actual y actualizo la lista
         
      } catch (error) {
        console.log(error);
      }
    };

  let date = new Date();

  //RECIBE UNA FUNCION COMO UN PARAMETRO y un ARREGLO para ejecutar la funcion - esta funcion se ejecuta cuando el componente se renderiza por primera vez o se actualice
  useEffect(() => {
    cargar_ingresos();
  }, []);
  return (
    <>
   
      <Grid sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h5">Lista Ingresos</Typography>
      </Grid>
      {searchedIngresos.map((ingreso) => (
        <Box
          key={ingreso.ID_Ingreso}
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
                Fecha Ingreso: {ingreso.Fecha_Ingreso.replace('T03:00:00.000Z','')}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Hora Ingreso: {ingreso.Hora_Ingreso.replace(':00','')}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Tipo Ingreso: {ingreso.Tipo_Ingreso}
              </Typography>

              <Typography sx={{ margin: "0.2rem" ,marginTop:"1.5rem"}}>
                DNI: {ingreso.DNI_Paciente}
              </Typography>
              <Typography sx={{ margin: "0.2rem" }}>
                Nombre: {ingreso.Nombre_Paciente}
              </Typography>
            </Grid>  
            
            <Grid
              item
              xs={12}
              md={4}
              lg={4}
              style={{ backgroundColor: "#1e272e" }}
            > 
             {ingreso.ID_Condicion && 
               <Button
               variant="contained"
               color="secondary"
               onClick={() => navigate(`/editar_condicion_paciente/${ingreso.DNI_Paciente}/${ingreso.ID_Condicion}`)}
               sx={{ margin: ".5rem" }}
               startIcon={<ContentPasteIcon />}
             >
               VER Condicion del Paciente            
             </Button> 
             }
             {!ingreso.ID_Condicion && 
               <Button
               variant="contained"
               color="secondary"
               onClick={() => navigate(`/condicion_paciente_ingreso/nuevo/${ingreso.DNI_Paciente}/${ingreso.ID_Ingreso}`)}
               sx={{ margin: ".5rem" }}
               startIcon={<ContentPasteIcon />}
             >
               Condicion del Paciente            
             </Button> 
             }

            {ingreso.ID_Egreso && 
              <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/egreso/${ingreso.DNI_Paciente}/editar/${ingreso.ID_Egreso}`)}
              sx={{ margin: ".5rem" }}
              startIcon={<OutboundIcon />}
              >
              VER Egreso del Paciente
              </Button> 
            }
            {!ingreso.ID_Egreso && 
              <Button
              variant="contained"
              color="warning"
              onClick={() => navigate(`/egreso/nuevo/${ingreso.DNI_Paciente}/${ingreso.ID_Ingreso}`)}
              sx={{ margin: ".5rem" }}
              startIcon={<OutboundIcon />}
              >
              Egreso del Paciente
              </Button> 
            }
            
             
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
                  navigate(`/ingreso/${ingreso.DNI_Paciente}/editar/${ingreso.ID_Ingreso}`)
                }
                sx={{ margin: ".5rem", color: "black", width: "7.6rem" }}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(ingreso.ID_Ingreso)}
                sx={{ margin: ".5rem", width: "7.6rem" }}
                startIcon={<DeleteIcon />}
                disabled={ingreso.ID_Egreso || ingreso.ID_Condicion}
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