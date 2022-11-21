import {
  TextField,
  Typography,
  Button,
  CardContent,
  Grid,
  Card,
  LinearProgress 
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "..//context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export default function Login() {
  const navigate = useNavigate();

  const[loading,setLoading] = useState(false);

  const [error, setError] = useState();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth(); //solo quiero el signup de useAuth

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleGoogleSignin = async (e) => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
     console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    //cancelo el refresh por defecto
    e.preventDefault();
    setError(""); //limpiar
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/network-request-failed":
          setError("Error de conexion con el servidor");
          break;
        case "auth/wrong-password":
          setError("La contraseña es INCORRECTA");
          break;
        case "auth/user-not-found":
          setError("Usuario NO ENCONTRADO");
          break;
        default:
          setError(error.code);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <Alert message={error} />}
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ marginTop: "1rem" }}
      >
        <Card
          sx={{
            mt: 1,
            backgroundColor: "white",
            padding: "1rem",
    
          }}
        >
          <Typography
            variant="h6"
            textAlign="center"
            color="#1b7eff"
            display=""
          >
            Iniciar Sesion
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                variant="filled"
                label="Email"
                type="email"
                onChange={handleChange}
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                inputProps={{ sx: { color: "Black" } }}
                InputLabelProps={{ sx: { color: "Black" } }}
              />
              <TextField
                name="password"
                variant="filled"
                label="Contraseña"
                onChange={handleChange}
                sx={{
                  display: "block",
                  marginTop: "1rem",
                }}
                type="password"
                inputProps={{ sx: { color: "Black" } }}
                InputLabelProps={{ sx: { color: "#Black" } }}
                
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "1rem",
                }}
                disabled={!user.email || !user.password}
                fullWidth
              >
                Ingresar
              </Button>           
              {loading ? (<LinearProgress />) : ('') }
            </form>
          </CardContent>
        </Card>
        <form onSubmit={handleGoogleSignin}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{
              marginTop: "1rem",
            }}
          >
            Iniciar sesion con cuenta de google
          </Button>
        </form>
      </Grid>
    </div>
  );
}