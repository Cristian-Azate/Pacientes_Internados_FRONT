import { useAuth } from "../context/authContext";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function Home() {
  const { user,logout,loading } = useAuth();
 

  const handleLogout = async() => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message)
    }
    
 
  }

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
            Bienvenido {user.displayName || user.email}
          </Typography>
          <CardContent>
            <form >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  marginTop: "1rem",
                }}
                onClick={handleLogout}
              >
                Cerrar Sesion
              
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
