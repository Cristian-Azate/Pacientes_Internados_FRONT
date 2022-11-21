import React from "react";
import { createContext,useState,useContext } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { pacientecontext } from "../context/pacienteContext";


//contiene el calor del paciente
export const obrasocialcontext = createContext();

export function ObraSocialProvider({ children }) {
    const{paciente,setpaciente} = useContext(pacientecontext); 
    const [lista_obras_sociales, setlista_obras_sociales] = useState([]);

     //BUSCO EL ID DE LA OBRA SOCIAL
   const ObtenerID_Obra_Social = async (nombre_obra_social) => {
    const resp = await fetch(`${endpoint}/buscar_id_obra_social/${nombre_obra_social}`);
    const data = await resp.json(); //tranformo los datos para poder leer
      setpaciente({ ...paciente, id_obra_social: data.ID_Obra_Social}); //fusiono el estado del paciente con este nuevo valor del campo
    };

    //BUSCO NOMBRE DE LA OBRA SOCIAL
    const Obtener_Obra_Social = async (id_obra_social) => {
      const resp = await fetch(`${endpoint}/buscar_nombre_obra_social/${id_obra_social}`);
      const data = await resp.json(); //tranformo los datos para poder leer
        setpaciente({ ...paciente, obra_social: data.Nombre_Obra_Social}); //fusiono el estado del paciente con este nuevo valor del campo
      };
 
   //funcion cargar OBRAS SOCIALES
   const cargarObras_Sociales = async () => {
     const resp = await fetch(`${endpoint}/obras_sociales`);
     //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK 
     const data = await resp.json(); //tranformo los datos para poder leer
     setlista_obras_sociales(data);
   };
 
      return (
        //todos componenetes hijo podra acceder a los datos de este componente padre
        //el valor es un objeto
        <obrasocialcontext.Provider value={{ ObtenerID_Obra_Social,Obtener_Obra_Social,cargarObras_Sociales,lista_obras_sociales,setlista_obras_sociales}}>{children}</obrasocialcontext.Provider>
      );
    }