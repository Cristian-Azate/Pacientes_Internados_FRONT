import React from "react";
import { createContext, useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";
import { vacunacontext } from "..//context/vacunaContext";
import { avatarClasses } from "@mui/material";

//contiene el valor del paciente
export const vacunapacientecontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function VacunaPacienteProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [alertavacunapaciente,setalertavacunapaciente] = useState(false);

  const [vacunapaciente, setvacunapaciente] = useState({
    id_paciente: 0,

    id_vacuna: 1,
    nombre_vacuna: "ANTIGRIPAL",

    id_vacuna_del_paciente: 0,
  });

  const limpiar_vacunapaciente = () => {
    setvacunapaciente({
      id_paciente: 0,

      id_vacuna: 0,
      nombre_vacuna: "ANTIGRIPAL",

      id_vacuna_del_paciente: 0,
    });
  };

  const [lista_vacunapaciente, setlistavacunapaciente] = useState([]);

  //funcion cargar VACUNAS PACIENTE
  const cargar_vacunapaciente = async (id_paciente) => {
    const resp = await fetch(`${endpoint}/lista_vacunaspaciente/${id_paciente}`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK 
    const data = await resp.json(); //tranformo los datos para poder leer
    setlistavacunapaciente(data);
  };

  const crear_vacunapaciente = async (vacunapaciente) => {
    const res = await fetch(`${endpoint}/crear_vacunapaciente`, {
      method: "POST",
      body: JSON.stringify(vacunapaciente),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data);
    console.log(data);
    console.log(vacunapaciente);
    setLoading(false);
    setalertavacunapaciente(true);
  };

  const eliminar_vacunapaciente = async (id_vacuna_del_paciente) => {
    const res = await fetch(
      `${endpoint}/eliminar_vacunapaciente/${id_vacuna_del_paciente}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
  };

  const modificar_vacunapaciente = async (id_vacuna_del_paciente) => {
    const resp = await fetch(
      `${endpoint}/modificar_vacunapaciente/${id_vacuna_del_paciente}`,
      {
        method: "PUT",
        body: JSON.stringify(vacunapaciente),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await resp.json();
    setLoading(false);
    setalertavacunapaciente(true);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <vacunapacientecontext.Provider
      value={{
        limpiar_vacunapaciente,
        vacunapaciente,
        setvacunapaciente,
        crear_vacunapaciente,
        cargar_vacunapaciente,
        eliminar_vacunapaciente,
        modificar_vacunapaciente,
        loading,
        setLoading,
        lista_vacunapaciente,
        setlistavacunapaciente,
        alertavacunapaciente,
        setalertavacunapaciente,
      }}
    >
      {children}
    </vacunapacientecontext.Provider>
  );
}
