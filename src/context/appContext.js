import React from "react";
import { createContext, useState, useContext } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { appacientecontext } from "../context/appacienteContext";

//contiene el calor del paciente
export const appcontext = createContext();

export function APPPrrovider({ children }) {
  const { appaciente, setappaciente } = useContext(appacientecontext);

  const [lista_apps, setlista_apps] = useState([]);

  //BUSCO EL ID DE LA APP
  const ObtenerID_APP = async (nombre_app) => {
    const resp = await fetch(`${endpoint}/buscar_id_app/${nombre_app}`);
    const data = await resp.json(); //tranformo los datos para poder leer
    setappaciente({ ...appaciente, id_app: data.ID_APP }); //fusiono el estado del paciente con este nuevo valor del campo
   
  };

  //BUSCO NOMBRE DE LA APP
  const Obtener_APP = async (id_app) => {
    const resp = await fetch(`${endpoint}/buscar_nombre_app/${id_app}`);
    const data = await resp.json(); //tranformo los datos para poder leer
    setappaciente({ ...appaciente, nombre_app: data.Nombre_APP }); //fusiono el estado del paciente con este nuevo valor del campo
  };

  //funcion cargar APPS
  const cargarAPPS = async () => {
    const resp = await fetch(`${endpoint}/apps`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
    const data = await resp.json(); //tranformo los datos para poder leer
    setlista_apps(data);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <appcontext.Provider
      value={{
        ObtenerID_APP,
        Obtener_APP,
        cargarAPPS,
        lista_apps,
        setlista_apps,
      }}
    >
      {children}
    </appcontext.Provider>
  );
}
