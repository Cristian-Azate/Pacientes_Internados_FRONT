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
import { useParams } from "react-router-dom";

import { Datos_Paciente } from "./Datos_Paciente";

import { egresocontext } from "..//context/egresoContext";
import { pacientecontext } from "..//context/pacienteContext";
import { Alert2 } from "./Alert2";



export default function Egreso_Form() {
   //*trae informacion de la url o los aprametros que estamos recibiendo
   const params = useParams();

   const{paciente,cargar_datos_paciente,limpiar_paciente} = useContext(pacientecontext); 

   const navigate = useNavigate();

   const currencies = [
    {
      value: 'A DOMICILIO',
      label: 'A DOMICILIO',
    },
    {
      value: 'ALTA MEDICA',
      label: 'ALTA MEDICA',
    },
    {
      value: 'ALTA VOLUNTARIA',
      label: 'ALTA VOLUNTARIA',
    },
    {
      value: 'DEFUNCION',
      label: 'DEFUNCION',
    },
    {
      value: 'DERIVACION',
      label: 'DERIVACION',
    },
  ];

  const{egreso,setegreso,crear_egreso,loading,setLoading,limpiar_egreso,alertaegreso} = useContext(egresocontext);

  const [currency, setCurrency] = useState('A DOMICILIO');

  

   //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>{
    setegreso({ ...egreso, [e.target.name]: e.target.value });
  };

  //Recibo el evento enviar
  //***********CREAR TAREA*****************
  const handleSubmit = async (e) => {
//cancelo el refresh por defecto
    e.preventDefault();
    setLoading(true);
    crear_egreso(egreso);
    //navigate("/");
  };

  useEffect(() => {
    limpiar_egreso();
    limpiar_paciente();  
  }, []);

  useEffect(() => {
    if (params.dni) {
      cargar_datos_paciente(params.dni);
    }
  }, [params.dni]); //si cambia el dni se carga de nuevo

  useEffect(() => {
    if (paciente.id_paciente!=0) {
        //Asigno el id del paciente al ingreso
        egreso.id_paciente=paciente.id_paciente;
        egreso.id_ingreso=params.id_ingreso;
    }
  }, [paciente.id_paciente]); //si cambia el dni se carga de nuevo

  return (
    <>
    <Grid
    sx={{ marginTop: "6.5rem" }}
    >
    <Datos_Paciente></Datos_Paciente>
    </Grid>
    
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{marginTop:"0rem"}}
    >
      <Grid item xs={3}>
        <Card
          sx={{
            mt: 5,
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="5" textAlign="center" color="white">
            Registrar Egreso de Paciente
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {" "}
              {/* utilizara esta funcion para manejar el envio */}
              <TextField
                name="fecha_egreso"
                onChange={handleChange}
                variant="outlined"
                label="Fecha Egreso"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                type="date"
                value={egreso.fecha_egreso}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}
              />
              <TextField
                name="hora_egreso"
                onChange={handleChange}
                variant="outlined"
                label="Hora Egreso"
                value={egreso.hora_egreso}
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                type="time"
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}
              />
              <TextField
                name="nombre_medico"
                onChange={handleChange}
                variant="outlined"
                label="Nombre del Medico de Alta"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
               
              />
              <TextField
                name="tipo_egreso"
                variant="outlined"
                select
                label="Tipo Egreso"
                value={egreso.tipo_egreso}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              
                sx={{
                  marginTop: "1rem",
                  width:"24ch",
                  marginBottom: "1rem"
                }}
                inputProps={{ sx: { color: "white" } }}
                InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }} 
              >
                  {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
           
                  ))
               }             
              </TextField> 
              {egreso.tipo_egreso=="A DOMICILIO" &&
                <Card
                sx={{
                  mt: 0,     
                  backgroundColor: "#1e272e",
                  padding: "1rem",              
                  border: "solid #FFFFFF 1px"  ,  
                  borderRadius:"15px" 
                }}
                >
                 <Typography variant="5" textAlign="center" color="white">
                   SAME
                 </Typography>
                 <TextField
                  name="numero_movil"
                  onChange={handleChange}
                  variant="outlined"
                  label="Numero de Movil"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                <TextField
                  name="operador_movil"
                  onChange={handleChange}
                  variant="outlined"
                  label="Operador-Nombre"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
              
               
                </Card>
                }  
              {egreso.tipo_egreso=="DERIVACION" &&
                <Card
                sx={{
                  mt: 0,     
                  backgroundColor: "#1e272e",
                  padding: "1rem",              
                  border: "solid #FFFFFF 1px"  ,  
                  borderRadius:"15px" 
                }}
                >
                 <Typography variant="5" textAlign="center" color="white">
                   SAME
                 </Typography>
                 <TextField
                  name="numero_movil"
                  onChange={handleChange}
                  variant="outlined"
                  label="Numero de Movil"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                <TextField
                  name="operador_movil"
                  onChange={handleChange}
                  variant="outlined"
                  label="Operador-Nombre"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                  <TextField
                  name="nombre_medico_deriva"
                  onChange={handleChange}
                  variant="outlined"
                  label="Medico que Deriva"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                  <TextField
                  name="institucion_derivada"
                  onChange={handleChange}
                  variant="outlined"
                  label="Instituciona a la que se deriva"
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                    marginLeft: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                </Card>
                }  
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "1rem",
                }}
                disabled={!paciente.dni_paciente || !paciente.nombre_paciente}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      {alertaegreso ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
    </Grid>
    </>
  );
}
