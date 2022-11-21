import React from "react";
import { createContext, useState, useContext } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { condicionpacientecontext } from "../context/condicionpacienteContext";

//contiene el calor del paciente
export const diagnosticocontext = createContext();

export function DiagnosticoProvider({ children }) {
  const {condicionpaciente, setcondicionpaciente } = useContext(condicionpacientecontext);
  const [lista_diagnosticos, setlista_diagnosticos] = useState([]);

  //BUSCO EL ID DEL DIAGNOSTICO
  const ObtenerID_Diagnostico = async (nombre_diagnostico) => {
    const resp = await fetch(
      `${endpoint}/buscar_id_diagnostico/${nombre_diagnostico}`
    );
    const data = await resp.json(); //tranformo los datos para poder leer
    setcondicionpaciente({ ...condicionpaciente, id_diagnostico: data.ID_Diagnostico }); //fusiono el estado del paciente con este nuevo valor del campo
  };

  //BUSCO NOMBRE DE LA OBRA SOCIAL
  const Obtener_Diagnostico = async (id_diagnostico) => {
    const resp = await fetch(
      `${endpoint}/buscar_nombre_diagnostico/${id_diagnostico}`
    );
    const data = await resp.json(); //tranformo los datos para poder leer
    setcondicionpaciente({ ...condicionpaciente, nombre_diagnostico: data.Nombre_Diagnostico}); //fusiono el estado del paciente con este nuevo valor del campo
  };

  //funcion cargar OBRAS SOCIALES
  const cargarDiagnosticos = async () => {
    const resp = await fetch(`${endpoint}/diagnosticos`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
    const data = await resp.json(); //tranformo los datos para poder leer
    setlista_diagnosticos(data);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <diagnosticocontext.Provider
      value={{
        ObtenerID_Diagnostico,
        Obtener_Diagnostico,
        cargarDiagnosticos,
        lista_diagnosticos,
        setlista_diagnosticos,
      }}
    >
      {children}
    </diagnosticocontext.Provider>
  );
}
