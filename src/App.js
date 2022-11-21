import { BrowserRouter, Routes, Route } from "react-router-dom";
//navegacion de rutas, las rutas
//react-router-dom navegar entre los componentes
import Pacientes_Lista from "./components/Pacientes_Lista";
import Paciente_Form from "./components/Paciente_Form";
import Paciente_Editar from "./components/Paciente_Editar";

import Ingreso_Form from "./components/Ingreso_Form";
import Ingresos from "./components/Ingresos";
import Ingreso_Editar from "./components/Ingreso_Editar";

import Egreso_Form from "./components/Egreso_Form";
import Egresos from "./components/Egresos";
import Egreso_Editar from "./components/Egreso_Editar";

import Condicion_Paciente_Form from "./components/Condicion_Paciente_Form";
import Condicion_Paciente_Form_Egreso from "./components/Condicion_Paciente_Form_Egreso";
import Condicion_Paciente_Editar from "./components/Condicion_Paciente_Editar";
import Condicion_Paciente_Editar_Egreso from "./components/Condicion_Paciente_Editar_Egreso";
import Servicio_Social_Form from "./components/Servicio_Social_Form";

import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import Home  from "./components/Home";
import Login from "./components/Login";
import Registrar from "./components/Registrar";

import {AuthProvider} from './context/authContext'
import {PacienteProvider} from './context/pacienteContext'
import {ObraSocialProvider} from './context/obrasocialContext'
import {APPacienteProvider} from './context/appacienteContext'
import {VacunaPacienteProvider} from './context/vacunapacienteContext'

import {IngresoProvider} from './context/ingresoContext'
import {EgresoProvider} from './context/egresoContext'
import {APPPrrovider} from './context/appContext'
import {DiagnosticoProvider} from './context/diagnosticoContext'
import {VacunaProvider} from './context/vacunaContext'
import {CondicionProvider} from './context/condicionpacienteContext'

import { ProtectedRoute } from "./components/ProtectedRoutes";

import Pacientes_Lista_Principal from "./components/Pacientes_Lista_Principal";

import  Image  from "./components/Image";

export default function App() {
  return (
    <div>
      <AuthProvider>
      <PacienteProvider>
      <APPacienteProvider>
      <VacunaPacienteProvider>
      <ObraSocialProvider> 
      <IngresoProvider>
      <APPPrrovider>
      <CondicionProvider> 
      <DiagnosticoProvider>
      <VacunaProvider>
      <EgresoProvider>
        <BrowserRouter>      
          <Container>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                   <Home />
                </ProtectedRoute>
               }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/lista_pacientes" element={
                 <ProtectedRoute>
                    <Pacientes_Lista_Principal />
                </ProtectedRoute>           
              }
              />
              <Route path="/paciente/nuevo" element={        
                 <ProtectedRoute>
                   <Paciente_Form />
                </ProtectedRoute> 
              } 
              />
              <Route path="/paciente/:dni/editar" element={       
               <ProtectedRoute>
                 <Paciente_Editar />
                </ProtectedRoute> 
              } 
              />
              <Route path="/ingreso/nuevo/:dni" element={            
              <ProtectedRoute>
                  <Ingreso_Form />
              </ProtectedRoute> 
              } 
              />
               <Route path="/ingreso/:dni/editar/:id_ingreso" element={       
               <ProtectedRoute>
                 <Ingreso_Editar />
                </ProtectedRoute> 
              } 
              />
              <Route path="/ingresos" element={            
              <ProtectedRoute>
                  <Ingresos />
              </ProtectedRoute> 
              } 
              />
              <Route path="/egreso/nuevo/:dni/:id_ingreso" element={              
              <ProtectedRoute>
                  <Egreso_Form />
              </ProtectedRoute> 
              } 
              />
               <Route path="/egreso/:dni/editar/:id_egreso" element={       
               <ProtectedRoute>
                 <Egreso_Editar />
                </ProtectedRoute> 
              } 
              />
              <Route path="/egresos" element={            
              <ProtectedRoute>
                  <Egresos />
              </ProtectedRoute> 
              } 
              />
              <Route
                path="/editar_condicion_paciente/:dni/:id_condicion" element={               
                <ProtectedRoute>
                 <Condicion_Paciente_Editar />
                </ProtectedRoute> 
              }
              />
               <Route
                path="/editar_condicion_paciente_egreso/:dni/:id_condicion" element={               
                <ProtectedRoute>
                 <Condicion_Paciente_Editar_Egreso />
                </ProtectedRoute> 
              }
              />
              <Route
                path="/condicion_paciente_ingreso/nuevo/:dni/:id_ingreso" element={               
                <ProtectedRoute>
                 <Condicion_Paciente_Form />
                </ProtectedRoute> 
              }
              />
              <Route
                path="/condicion_paciente_egreso/nuevo/:dni/:id_egreso" element={               
                <ProtectedRoute>
                 <Condicion_Paciente_Form_Egreso />
                </ProtectedRoute> 
              }
              />
              <Route
                path="/servicio_social/nuevo" element={               
                <ProtectedRoute>
                 <Servicio_Social_Form />
                </ProtectedRoute> 
              }
              />

              <Route path="/ver_imagen_frontal/:dni" element={       
               <ProtectedRoute>
                 <Image />
                </ProtectedRoute> 
              } 
              />               
            </Routes>
          </Container>
        </BrowserRouter>
      </EgresoProvider> 
      </VacunaProvider>
      </DiagnosticoProvider>
      </CondicionProvider> 
      </APPPrrovider>
      </IngresoProvider>
      </ObraSocialProvider>
      </VacunaPacienteProvider>  
      </APPacienteProvider>
      </PacienteProvider>
      </AuthProvider>
    </div>
  );
}
