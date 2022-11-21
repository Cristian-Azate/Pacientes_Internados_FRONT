import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Servicio_Social_Form() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //estado donde guardar/capturar los datos
  const [paciente, setpaciente] = useState({
    dni_paciente: "",
    nombre_paciente: "",
  });

  //recibo el evento onchange para cualquier onchange de los campos
  const handleChange = (e) =>
    setpaciente({ ...paciente, [e.target.name]: e.target.value });

  //Recibo el evento enviar
  //***********CREAR TAREA*****************
  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();

    setLoading(true);

    // al guardar siempre me devuelve el paciente que cree
    const res = await fetch(`http://localhost:4000/crear_paciente`, {
      method: "POST",
      body: JSON.stringify(paciente),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data);

    setLoading(false);

    navigate("/");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{marginTop:"4.5rem"}}
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
            Servicio Social Paciente
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {" "}
              {/* utilizara esta funcion para manejar el envio */}
              <TextField
                name="dni_paciente"
                onChange={handleChange}
                variant="outlined"
                label="Servicio de Sepelio"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <TextField
                name="nombre_paciente"
                onChange={handleChange}
                variant="outlined"
                label="Nombre del Responsable del Paciente"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <TextField
                name="nombre_paciente"
                onChange={handleChange}
                variant="outlined"
                label="Telefono del Responsable"
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "White" } }}
                InputLabelProps={{ sx: { color: "#028dff" } }}
              />
              <Button
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
    </Grid>
  );
}
