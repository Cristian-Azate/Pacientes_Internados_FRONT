import React from "react";
import { createContext, useState, useContext } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { vacunapacientecontext } from "../context/vacunapacienteContext";

//contiene el calor del paciente
export const vacunacontext = createContext();

export function VacunaProvider({ children }) {
  const { vacunapaciente, setvacunapaciente } = useContext(vacunapacientecontext);
  const [lista_vacunas, setlista_vacunas] = useState([]);

  //BUSCO EL ID DE LA VACUNA
  const ObtenerID_Vacuna = async (nombre_vacuna) => {
    const resp = await fetch(`${endpoint}/buscar_id_vacuna/${nombre_vacuna}`);
    const data = await resp.json(); //tranformo los datos para poder leer
    setvacunapaciente({ ...vacunapaciente, id_vacuna: data.ID_Vacuna }); //fusiono el estado del paciente con este nuevo valor del campo
  };

  //BUSCO NOMBRE DE LA VACUNA
  const Obtener_Vacuna = async (id_vacuna) => {
    const resp = await fetch(`${endpoint}/buscar_nombre_vacuna/${id_vacuna}`);
    const data = await resp.json(); //tranformo los datos para poder leer
    setvacunapaciente({ ...vacunapaciente, nombre_vacuna: data.Nombre_Vacuna }); //fusiono el estado del paciente con este nuevo valor del campo
  };

  //funcion cargar VACUNAS
  const cargarVacunas = async () => {
    const resp = await fetch(`${endpoint}/vacunas`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
    const data = await resp.json(); //tranformo los datos para poder leer
    setlista_vacunas(data);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <vacunacontext.Provider
      value={{
        ObtenerID_Vacuna,
        Obtener_Vacuna,
        cargarVacunas,
        lista_vacunas,
        setlista_vacunas,
      }}
    >
      {children}
    </vacunacontext.Provider>
  );
}
