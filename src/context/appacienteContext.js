import React from "react";
import { createContext, useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { appcontext } from "..//context/appContext";
import { avatarClasses } from "@mui/material";

//contiene el valor de las vacunas del paciente
export const appacientecontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function APPacienteProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [alertaapppaciente,setalertaapppaciente] = useState(false);

  const [appaciente, setappaciente] = useState({
    id_paciente: 0,

    id_app: 3,
    nombre_app: "ACV",

    id_app_del_paciente: 0,
  });

  const limpiar_appaciente = () => {
    setappaciente({
      id_paciente: 0,
      id_app: 0,

      id_app_del_paciente: 0,
    });
  };

  const [lista_appaciente, setlistaappaciente] = useState([]);

  //funcion cargar ANTECEDENTES PATOLOGICOS PACIENTE
  const cargar_appaciente = async (id_paciente) => {
    const resp = await fetch(`${endpoint}/lista_appaciente/${id_paciente}`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK 
    const data = await resp.json(); //tranformo los datos para poder leer
    setlistaappaciente(data);

  };

  const crear_appaciente = async (appaciente) => {
    const res = await fetch(`${endpoint}/crear_appaciente`, {
      method: "POST",
      body: JSON.stringify(appaciente),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data);
    console.log(data);
    console.log(appaciente);
    setLoading(false);
    setalertaapppaciente(true);
  };

  const eliminar_apppaciente = async (id_app_del_paciente) => {
    const res = await fetch(
      `${endpoint}/eliminar_appaciente/${id_app_del_paciente}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
  };

  const modificar_appaciente = async (id_app_del_paciente) => {
    const resp = await fetch(
      `${endpoint}/modificar_appaciente/${id_app_del_paciente}`,
      {
        method: "PUT",
        body: JSON.stringify(appaciente),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await resp.json();
    setLoading(false);
    setalertaapppaciente(true);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <appacientecontext.Provider
      value={{
        limpiar_appaciente,
        appaciente,
        setappaciente,
        crear_appaciente,
        cargar_appaciente,
        eliminar_apppaciente,
        modificar_appaciente,
        loading,
        setLoading,
        lista_appaciente,
        setlistaappaciente,
        alertaapppaciente,
        setalertaapppaciente,
      }}
    >
      {children}
    </appacientecontext.Provider>
  );
}
