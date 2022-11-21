import {AppBar, Button, Toolbar, Typography,Menu,MenuItem, IconButton, Tabs, Tab} from '@mui/material'
import { Container } from '@mui/system'
import {Link, useNavigate} from 'react-router-dom'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAuth } from "../context/authContext";

import { useState,useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
 

export default function Navbar() {
  useEffect(() => {
    isMobile();
  }, []);


  //para el valor del tab y cuando selecciono otro
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //posicion de los menus desplegables ya sea para tab o el icono 
  const [vertical, setVertical] = useState("bottom");
  const [horizontal, setHorizontal] = useState("left");

  const click_menu_tab = () => {
      setVertical("bottom");
      setHorizontal("left");
  };

  const click_menu_icon = () => { 
      setVertical("top");
      setHorizontal("right");
  };

  
  const [visibilityMobile, setVisibilityMobile] = useState("hidden");
  const [visibilityPC, setVisibilityPC] = useState("visible");

  function isMobile(){
    if ((navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/i)))
      {
        setVisibilityMobile("visible")
        setVisibilityPC("hidden")
      }
    else
      {
      setVisibilityMobile("hidden")
      setVisibilityPC("visible")
      }
}
  
const [anchorElPacientes, setAnchorElPacientes] = useState(null);
const [anchorElIngresos, setanchorElIngresos] = useState(null);
const [anchorElEgresos, setanchorElEgresos] = useState(null);
const [anchorElCondicion_Paciente, setanchorElCondicion_Paciente] = useState(null);
const [anchorElServicios_Sociales, setanchorElServicios_Sociales] = useState(null);
const [anchorElMenu_M, setanchorElMenu_M] = useState(null);

const openPaciente = Boolean(anchorElPacientes);
const openIngresos = Boolean(anchorElIngresos);
const openEgresos = Boolean(anchorElEgresos);
const openCondicionPaciente = Boolean(anchorElCondicion_Paciente);
const openServicios_Sociales = Boolean(anchorElServicios_Sociales);
const openMenu_M = Boolean(anchorElMenu_M);

const handleClickMenu_M = (e) => {
  setanchorElMenu_M(e.currentTarget);
};
const handleCloseMenu_M = () => {
  setanchorElMenu_M(null);
};

const handleClickPaciente = (e) => {
  setAnchorElPacientes(e.currentTarget);
};
const handleClosePaciente = () => {
  setAnchorElPacientes(null);
};

const handleClickIngresos = (e) => {
  setanchorElIngresos(e.currentTarget);
};
const handleCloseIngresos = () => {
  setanchorElIngresos(null);
};

const handleClickEgresos = (e) => {
  setanchorElEgresos(e.currentTarget);
};
const handleCloseEgresos = () => {
  setanchorElEgresos(null);
};

const handleClickCondicion_Paciente = (e) => {
  setanchorElCondicion_Paciente(e.currentTarget);
};
const handleCloseCondicion_Paciente = () => {
  setanchorElCondicion_Paciente(null);
};

const handleClickServicios_Sociales = (e) => {
  setanchorElServicios_Sociales(e.currentTarget);
};
const handleCloseServicios_Sociales = () => {
  setanchorElServicios_Sociales(null);
};

  const onNuevoPaciente = () => {
    navigate('/paciente/nuevo');
    handleClosePaciente();
    handleCloseMenu_M();
  }

  const onIngresos = () => {
    navigate('/ingresos');
    handleCloseIngresos();
    handleCloseMenu_M();
  }

  const onListaPacientes = () => {
    navigate('/lista_pacientes');
    handleClosePaciente();
    handleCloseMenu_M();
  }

  const onEgresos = () => {
    navigate('/egresos');
    handleCloseEgresos();
    handleCloseMenu_M();
  }

const {logout} = useAuth();

const handleLogout = async() => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message)
    }
  }

const navigate = useNavigate()

  return (
  <> 
        <AppBar position="fixed"  sx={{backgroundColor: "#2d3436"}}>
          <Container>
             <Toolbar>
                <IconButton 
                  color="inherit"
                  aria-controls={openMenu_M ? 'menu_pacientes' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu_M ? 'true' : undefined}
                  onClick={handleClickMenu_M}
                  sx={{visibility:(visibilityMobile)}}                 
                >
                <MenuIcon fontSize="large"/>
                </IconButton>   
                <Typography variant="h6" sx={{flexGrow: 1}}>
                  <Link to="/lista_pacientes" style={{textDecoration:"none",color:"#25a7f1"}}>Hospital San Roque</Link>
                </Typography>
                <Tabs 
                  value={value} 
                  onChange={handleChange}
                  onClick={click_menu_tab}
                  sx={{visibility:(visibilityPC)}}     
                >
                 <Tab  label="Pacientes"
                     aria-controls={openPaciente ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openPaciente ? 'true' : undefined}
                     onClick={handleClickPaciente} 
                 />
                 <Tab  label="Ingresos"
                     aria-controls={openIngresos ? 'menu_ingresos' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openIngresos ? 'true' : undefined}
                     onClick={handleClickIngresos} 
                 />
                  <Tab  label="Egresos"
                     aria-controls={openIngresos ? 'menu_ingresos' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openIngresos ? 'true' : undefined}
                     onClick={handleClickEgresos} 
                 />
                 <Tab  label="Condicion Paciente"
                     aria-controls={openCondicionPaciente ? 'menu_ingresos' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openCondicionPaciente ? 'true' : undefined}
                     onClick={handleClickCondicion_Paciente} 
                 />
                 <Tab  label="Servicios Sociales"
                     aria-controls={openServicios_Sociales ? 'menu_ingresos' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openServicios_Sociales ? 'true' : undefined}
                     onClick={handleClickServicios_Sociales} 
                 />
                </Tabs>
                <Menu
                id="menu_principal_m"
                anchorEl={anchorElMenu_M}
                open={openMenu_M}
                onClose={handleCloseMenu_M}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}      
                onClick={click_menu_icon}  
                anchorOrigin={{
                  vertical:"bottom",
                  horizontal: "left",
                  }}       
                >
                  <MenuItem     
                     aria-controls={openPaciente ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openPaciente ? 'true' : undefined}
                     onClick={handleClickPaciente}
                  >
                    Pacientes
                  </MenuItem>
                  <MenuItem 
                     aria-controls={openIngresos ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openIngresos ? 'true' : undefined}
                     onClick={handleClickIngresos}
                  >
                    Ingresos
                  </MenuItem>
                  <MenuItem 
                     aria-controls={openEgresos ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openEgresos ? 'true' : undefined}
                     onClick={handleClickEgresos} 
                  >
                    Egresos
                  </MenuItem>
                  <MenuItem
                     aria-controls={openCondicionPaciente ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openCondicionPaciente ? 'true' : undefined}
                     onClick={handleClickCondicion_Paciente}
                  >
                    Condicion Paciente
                  </MenuItem>
                  <MenuItem
                     aria-controls={openServicios_Sociales ? 'menu_pacientes' : undefined}
                     aria-haspopup="true"
                     aria-expanded={openServicios_Sociales ? 'true' : undefined}
                     onClick={handleClickServicios_Sociales}
                  >
                    Servicios Sociales
                  </MenuItem>
                </Menu>
               {/* MENUS DE CADA SEECCION ITEM */}
                <Menu
                id="menu_pacientes"
                anchorEl={anchorElPacientes}
                open={openPaciente}
                onClose={handleClosePaciente}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: (vertical),
                  horizontal: (horizontal),
                  }}
                >
                  <MenuItem  onClick={onNuevoPaciente}>Nuevo Paciente</MenuItem>
                  <MenuItem onClick={onListaPacientes}>Lista de Pacientes</MenuItem>
                </Menu>             
                <Menu
                id="menu_ingresos"
                anchorEl={anchorElIngresos}
                open={openIngresos}
                onClose={handleCloseIngresos}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: (vertical),
                  horizontal: (horizontal),
                  }}              
                >
                  <MenuItem  onClick={onIngresos}>Registrar Ingreso</MenuItem>
                </Menu>
                <Menu
                id="menu_egresos"
                anchorEl={anchorElEgresos}
                open={openEgresos}
                onClose={handleCloseEgresos}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: (vertical),
                  horizontal: (horizontal),
                  }}       
                >
                  <MenuItem  onClick={onEgresos}>Registrar Egreso</MenuItem>
                </Menu>
                <Menu
                id="menu_condicion_paciente"
                anchorEl={anchorElCondicion_Paciente}
                open={openCondicionPaciente}
                onClose={handleCloseCondicion_Paciente}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: (vertical),
                  horizontal: (horizontal),
                  }}  
                >
                  <MenuItem  onClick={onNuevoPaciente}>Registrar Condicion</MenuItem>
                </Menu>
                <Menu
                id="menu_servicios_sociales"
                anchorEl={anchorElServicios_Sociales}
                open={openServicios_Sociales}
                onClose={handleCloseServicios_Sociales}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: (vertical),
                  horizontal: (horizontal),
                  }}
                >
                  <MenuItem  onClick={onNuevoPaciente}>Registrar Servicio Social</MenuItem>
                </Menu>
              {/* ---------------------------------------------- */}
                <Button 
                variant="contained"
                color="success" 
                onClick={handleLogout}
                sx={{marginRight: "auto"}}
                startIcon={<ExitToAppIcon />}
                >
                    Salir
                </Button>   
             
                <IconButton color="inherit">
                <PersonIcon fontSize="large" />
                </IconButton>                    
                </Toolbar>
          </Container>
        </AppBar>
  
  </>
  )
}
