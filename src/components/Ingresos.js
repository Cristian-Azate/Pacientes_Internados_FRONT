import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect,useContext } from "react";
  import { Navigate, useNavigate } from "react-router-dom";
  import { Search_bar } from "./Search_bar";

  import { pacientecontext } from "..//context/pacienteContext";
  import { ingresocontext } from "..//context/ingresoContext";
  
  import { Ingresos_Lista } from "./Ingresos_Lista";
  
  export default function Ingresos() {

    const {searchedIngresos,ingreso, cargar_ingresos ,lista_ingresos,setlistaingresos,eliminar_ingreso,limpiar_ingreso} = useContext(ingresocontext); 
    const {paciente, limpiar_paciente} = useContext(pacientecontext); 

    const navigate = useNavigate();


    useEffect(() => {
      limpiar_paciente();
      //cargar_pacientes(); DEBERIA CARGAR LOS INGRESOS
    }, []);
  
    return (
      <Grid sx={{ marginTop: "6rem", marginBottom: "1rem" }}>
        <Search_bar />
        {paciente.nombre_paciente &&     
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(`/ingreso/nuevo/${paciente.dni_paciente}`)}
       
        fullWidth
      >
        REGISTRA NUEVO INGRESO
      </Button> 
        }
      <Ingresos_Lista />
      </Grid>
    );
  }
  