import React from "react";
import { createContext, useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";

//contiene el valor del condicionpaciente
export const condicionpacientecontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function CondicionProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [alertacondicionpaciente, setalertacondicionpaciente] = useState(false);

  const [condicionpaciente, setcondicionpaciente] = useState({
    frecuencia_cardiaca: "",
    frecuencia_respiratoria: "",
    tension_arterial: "",
    saturacion: "",
    temperatura: "",

    id_diagnostico: 1,
    nombre_diagnostico: "ARTRITIS REUMATOIDE",

    id_condicion: 0,

    id_ingreso: 0,
    id_egreso: 0,
    id_paciente: 0,
  });

  const limpiar_condicionpaciente = () => {
    setcondicionpaciente({
      frecuencia_cardiaca: "",
      frecuencia_respiratoria: "",
      tension_arterial: "",
      saturacion: "",
      temperatura: "",

      id_diagnostico: 0,
      nombre_diagnostico: "",

      id_condicion: 0,

      id_ingreso: 0,
      id_egreso: 0,
      id_paciente: 0,
    });
  };

  const limpiar_condicionpaciente_para_egreso = () => {
    setcondicionpaciente({
      frecuencia_cardiaca: "",
      frecuencia_respiratoria: "",
      tension_arterial: "",
      saturacion: "",
      temperatura: "",

      id_diagnostico: 0,
      nombre_diagnostico: "",

      id_condicion: 0,

      id_ingreso: 0,
      id_paciente: 0,
    });
  };

  const crear_condicionpaciente = async (condicionpaciente) => {
    const res = await fetch(`${endpoint}/crear_condicionpaciente`, {
      method: "POST",
      body: JSON.stringify(condicionpaciente),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data);
    console.log(data);
    console.log(condicionpaciente);
    setLoading(false);
    setalertacondicionpaciente(true);
  };

  const cargar_datos_condicionpaciente = async (id_condicion) => {
    const res = await fetch(
      `${endpoint}/buscar_condicion_ingreso/${id_condicion}`
    );
    const data = await res.json();
    setcondicionpaciente({
     
      frecuencia_cardiaca: data.Frecuencia_Cardiaca,
      frecuencia_respiratoria: data.Frecuencia_Respiratoria,
      tension_arterial: data.Tension_Arterial,
      saturacion: data.Saturacion,
      temperatura: data.Temperatura,

      id_diagnostico: data.ID_Diagnostico,
      nombre_diagnostico: "",

      id_condicion: data.ID_Condicion,

      id_ingreso: data.ID_Ingreso,
      id_egreso: data.ID_Egreso,
      id_paciente: data.ID_Paciente,
      
    });
  };

  const eliminar_condicionpaciente = async (dni_paciente) => {
    const res = await fetch(
      `${endpoint}/condicionpaciente_eliminar/${dni_paciente}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
  };

  //funcion cargar condicionpacienteS

  const modificar_condicionpaciente = async (id_condicion) => {
    const resp = await fetch(
      `${endpoint}/modificar_condicionpaciente/${id_condicion}`,
      {
        method: "PUT",
        body: JSON.stringify(condicionpaciente),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await resp.json();
    setLoading(false);
    setalertacondicionpaciente(true);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <condicionpacientecontext.Provider
      value={{
        limpiar_condicionpaciente,
        condicionpaciente, 
        setcondicionpaciente,
        crear_condicionpaciente,
        cargar_datos_condicionpaciente,
        eliminar_condicionpaciente,
        modificar_condicionpaciente,
        loading,
        setLoading,
        setalertacondicionpaciente,
        alertacondicionpaciente,
        limpiar_condicionpaciente_para_egreso,
      }}
    >
      {children}
    </condicionpacientecontext.Provider>
  );
}
