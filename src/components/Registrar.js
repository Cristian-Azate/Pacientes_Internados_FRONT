import {  TextField,  Typography,  Button,  CardContent,  Grid,} from "@mui/material";
import { useState } from "react";
import { useAuth } from "..//context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export default function Registrar() {
  const navigate = useNavigate();

  const [error, setError] = useState();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth(); //solo quiero el signup de useAuth

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    //cancelo el refresh por defecto
    e.preventDefault();
    setError(""); //limpiar
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("La contraseña debe contener al menos 6 caracteres");
      } else setError(error.code);
    }
  };

  return (
    <div>
       {error && <Alert message={error}/>}
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="5" textAlign="center" color="white">
          Registrar
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              variant="outlined"
              label="Email"
              type="email"
              onChange={handleChange}
              sx={{
                display: "block",
                marginTop: "1rem",
              }}
              inputProps={{ sx: { color: "White" } }}
              InputLabelProps={{ sx: { color: "#028dff" } }}
            />
            <TextField
              name="password"
              variant="outlined"
              label="Contraseña"
              onChange={handleChange}
              sx={{
                display: "block",
                marginTop: "1rem",
              }}
              type="password"
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
              disabled={!user.email || !user.password}
            >
              Registrar
            </Button>
          </form>
        </CardContent>
      </Grid>
    </div>
  );
}
