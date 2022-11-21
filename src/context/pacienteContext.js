import React from "react";
import { createContext,useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";

//contiene el calor del paciente
export const pacientecontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function PacienteProvider({ children }) {
  const[loading,setLoading] = useState(false);
  const[alerta,setAlerta] = useState(false);

  const[searchValue,setsearchValue] = useState('');

  const [paciente, setpaciente] = useState({
    dni_paciente: "", 
    nombre_paciente: "",
    fecha_nacimiento: "1990-01-01",
    historia_clinica: "",
    obra_social: "INCLUIR",
    id_obra_social: 0,
    telefono: "",
    calle: "",
    barrio: "",
    localidad: "",
    urlfrontal:"",

    id_paciente:0,
  }); 

  const limpiar_paciente = () => {
    setpaciente({
    dni_paciente: "", 
    nombre_paciente: "",
    fecha_nacimiento: "1990-01-01",
    historia_clinica: "",
    obra_social: "",
    id_obra_social: 0,
    telefono: "",
    calle: "",
    barrio: "",
    localidad: "",
    urlfrontal:null,

    id_paciente:0,
    });
  };
    
    const [lista_pacientes, setlistapacientes] = useState([]);

    const crear_paciente = async (paciente) => {
        const res = await fetch(`${endpoint}/crear_paciente`, {
          method: "POST",
          body: JSON.stringify(paciente),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        //console.log(data);
        console.log(data);
        console.log(paciente);
        setLoading(false);
        setAlerta(true);
      };

    const cargar_datos_paciente = async (dni_paciente) => {
        const res = await fetch(`${endpoint}/buscar_paciente/${dni_paciente}`);
        const data = await res.json();
        setpaciente({
          dni_paciente: data.DNI_Paciente,
          nombre_paciente: data.Nombre_Paciente,
          fecha_nacimiento: data.Fecha_Nacimiento,
          historia_clinica: data.Historia_Clinica,
          obra_social: "",
          id_obra_social:data.ID_Obra_Social,
          telefono:data.Telefono,
          calle: data.Domicilio_Calle,
          barrio: data.Domicilio_Barrio,
          localidad: data.Domicilio_Localidad,

          urlfrontal: data.URL_Frontal,
          id_paciente: data.ID_Paciente,
        });
      };

    const eliminar_paciente = async (dni_paciente) => {
        const res = await fetch(`${endpoint}/paciente_eliminar/${dni_paciente}`, {
            method: "DELETE",
          });
        const data = await res.json();
      };

     //funcion cargar PACIENTES
    const cargar_pacientes = async () => {
        const resp = await fetch(`${endpoint}/pacientes`);
        //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
        const data = await resp.json(); //tranformo los datos para poder leer
        setlistapacientes(data);
      };

      

      let searchedPacientes=[];
      //barra de busqueda
        if (!searchValue.length>=1){       
          searchedPacientes=lista_pacientes;
        }
        else
        {
            searchedPacientes = lista_pacientes.filter(paciente =>
            paciente.DNI_Paciente==searchValue);
        }
         
      
      //---- barra busqueda
    
  
    const modificar_paciente = async (dni_paciente) => {
      const resp = await fetch(`${endpoint}/modificar_paciente/${dni_paciente}`, {
        method: "PUT",
        body: JSON.stringify(paciente),
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      setLoading(false);
      setAlerta(true);
    };

    return (
      //todos componenetes hijo podra acceder a los datos de este componente padre
      //el valor es un objeto
      <pacientecontext.Provider value={{
        limpiar_paciente,
        paciente,
        setpaciente,
        lista_pacientes,
        setlistapacientes,
        crear_paciente,
        cargar_datos_paciente,
        eliminar_paciente,
        cargar_pacientes,
        modificar_paciente,
        loading,
        setLoading,
        alerta,
        setAlerta,
        searchValue,
        setsearchValue,
        searchedPacientes
      }}
      >
        {children}
      </pacientecontext.Provider>
    );
  }