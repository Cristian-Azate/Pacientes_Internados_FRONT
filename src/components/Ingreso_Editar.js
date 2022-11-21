import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography,
    Box,
    MenuItem,
  } from "@mui/material";
  import { useEffect,useContext,useState} from "react";
  import { Navigate, useNavigate } from "react-router-dom";
  import { useParams } from "react-router-dom";
  import { Datos_Paciente } from "./Datos_Paciente";
  
  import { ingresocontext } from "..//context/ingresoContext";
  import { pacientecontext } from "..//context/pacienteContext";

  import { Alert2 } from "./Alert2";
  
  export default function Ingreso_Editar() {
    //*trae informacion de la url o los aprametros que estamos recibiendo
    const params = useParams();
  
    const{paciente,cargar_datos_paciente,limpiar_paciente} = useContext(pacientecontext); 
  
    const navigate = useNavigate();
    let date = new Date();
  
    const currencies = [
      {
        value: 'ASISTENCIA DE 3ROS',
        label: 'ASISTENCIA DE 3ROS',
      },
      {
        value: 'CONSULTORIO',
        label: 'CONSULTORIO',
      },
      {
        value: 'DERIVADO',
        label: 'DERIVADO',
      },
      {
        value: 'MEDIOS PROPIOS',
        label: 'MEDIOS PROPIOS',
      },
    
    ];
    
  
    const{ingreso,setingreso,crear_ingreso,loading,setLoading,limpiar_ingreso,cargar_datos_ingreso,modificar_ingreso,eliminar_ingreso,alertaingreso} = useContext(ingresocontext);
  
    const [currency, setCurrency] = useState('NORMAL');
  
    //recibo el evento onchange para cualquier onchange de los campos
    const handleChange = (e) =>{
    setingreso({ ...ingreso, [e.target.name]: e.target.value });
    }
    //Recibo el evento enviar
    //***********CREAR TAREA*****************
    const handleSubmit = async (e) => {
      //cancelo el refresh por defecto
      e.preventDefault();
      setLoading(true);
      modificar_ingreso(params.id_ingreso)
      //navigate("/");
    };
  
   
  
    useEffect(() => {
      if (params.dni) {
        cargar_datos_paciente(params.dni);
      }
    }, [params.dni]); //cargo los datos del paciente al recibir el dni
  
    useEffect(() => {
        if (params.id_ingreso) {
            cargar_datos_ingreso(params.id_ingreso);
          }
        }, [params.id_ingreso]); //si cambia el dni se carga de nuevo
  
  
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
              mt: 0,
              backgroundColor: "#1e272e",
              padding: "1rem",
              width:"15.72rem"
            }}
          >
            <Typography variant="5" textAlign="center" color="white">
              Ingreso de Paciente
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {" "}
                {/* utilizara esta funcion para manejar el envio */}
                <TextField
                  name="fecha_ingreso"
                  onChange={handleChange}
                  variant="outlined"
                  label="Fecha Ingreso"
                  type="date"
                  value={ingreso.fecha_ingreso.replace('T03:00:00.000Z','')}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" }}}
                />
                <TextField
                  name="hora_ingreso"
                  onChange={handleChange}
                  variant="outlined"
                  label="Hora Ingreso"
                  type="time"
                  value={ingreso.hora_ingreso}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } ,shrink: true }}
                />
                <TextField
                  name="nombre_medico"
                  onChange={handleChange}
                  variant="outlined"
                  label="Nombre Medico que recibe"
                  value={ingreso.nombre_medico}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
          
                <TextField
                  name="numero_ficha_internacion"
                  onChange={handleChange}
                  variant="outlined"
                  label="Nº de Ficha de Internacion"
                  value={ingreso.numero_ficha_internacion}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                <TextField
                  name="unidad_internacion"
                  onChange={handleChange}
                  variant="outlined"
                  label="Unidad de Internacion"
                  value={ingreso.unidad_internacion}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                <TextField
                  name="numero_cama"
                  onChange={handleChange}
                  variant="outlined"
                  label="Nº de Cama"
                  value={ingreso.numero_cama}
                  sx={{
                    display: "block",
                    marginTop: "1rem",
                  }}
                  inputProps={{ sx: { color: "White" } }}
                  InputLabelProps={{ sx: { color: "#028dff" } }}
                />
                <TextField
                  name="tipo_ingreso"
                  variant="outlined"
                  select
                  label="Tipo Ingreso"
                  value={ingreso.tipo_ingreso}
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
                {ingreso.tipo_ingreso=="DERIVADO" &&
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
                
                <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "1rem",
                }}
                disabled={!ingreso.id_ingreso}
                fullWidth
              >
                {loading ? (<CircularProgress color="inherit" size={24} />) : ("Editar")}
              </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        {alertaingreso ? (<Alert2 titulo={"Aviso"} mensaje={"Datos Guardados Correctamente"} />) : ("")  }
        </Grid>
      </>
    );
  }