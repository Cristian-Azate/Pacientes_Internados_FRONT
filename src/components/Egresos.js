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
  import { egresocontext } from "..//context/egresoContext";
  

  import { Egresos_Lista } from "./Egresos_Lista";
  
  export default function Egresos() {

    const {} = useContext(egresocontext); 
    const {paciente, limpiar_paciente} = useContext(pacientecontext); 

    const navigate = useNavigate();


    useEffect(() => {
      limpiar_paciente();
      //cargar_pacientes(); DEBERIA CARGAR LOS INGRESOS
    }, []);
  
    return (
      <Grid sx={{ marginTop: "6rem", marginBottom: "1rem" }}>
        <Search_bar />
     
      <Egresos_Lista />
      </Grid>
    );
  }