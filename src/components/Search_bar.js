import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import { Box } from "@mui/material";

import { pacientecontext } from "..//context/pacienteContext";
import { ingresocontext } from "..//context/ingresoContext";

import { Datos_Paciente } from "./Datos_Paciente";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
 
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));



export function Search_bar() {
  
  const {cargar_datos_paciente} = useContext(pacientecontext);
  const {searchValue,setsearchValue} = useContext(ingresocontext);  

  const handleChange = async (e) =>{
    //busco los datos del paciente  a partir del dni
    cargar_datos_paciente(e.target.value);

    //busco los ingresos a partir del id del paciente
    setsearchValue(e.target.value);
  }

  return (
    <Box sx={{ flexGrow: 1 , marginBottom: "1rem"}} >
      <AppBar position="static" sx={{backgroundColor: "#2d3436"}}>
        <Toolbar>  
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="nombre_dni_paciente"
              onChange={handleChange}
              placeholder="Buscar Paciente…"
              inputProps={{ 'aria-label': 'search' }}     
              fullWidth     
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Datos_Paciente/>
    </Box>
  );
}