import React from "react";
import { createContext, useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";

//contiene el calor del paciente
export const egresocontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function EgresoProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [alertaegreso, setalertaegreso] = useState(false);

  const [searchValue, setsearchValue] = useState("");

  let date = new Date();
  let horas = "";
  let minutos = "";

  const [fecha_desde, setfechadesde] = useState(
    date.toISOString().split("T")[0]
  );
  const [fecha_hasta, setfechahasta] = useState(
    date.toISOString().split("T")[0]
  );

  if (date.getHours() <= 9) {
    horas = "0" + date.getHours();
  } else horas = date.getHours();

  if (date.getMinutes() <= 9) {
    minutos = "0" + date.getMinutes();
  } else minutos = date.getMinutes();

  const [egreso, setegreso] = useState({
    fecha_egreso: date.toISOString().split("T")[0],
    hora_egreso: horas + ":" + minutos,
    nombre_medico: "",

    id_ingreso: 0,
    id_paciente: 0,

    tipo_egreso: "A DOMICILIO",
    id_egreso: 0,
  });

  const limpiar_egreso = () => {
    setegreso({
      fecha_egreso: date.toISOString().split("T")[0],
      hora_egreso: horas + ":" + minutos,
      nombre_medico: "",

      id_ingreso: 0,
      id_paciente: 0,

      tipo_egreso: "A DOMICILIO",
      id_egreso: 0,
    });
  };

  const obtener_id_paciente = (paciente) => {
    setegreso({
      id_paciente: paciente.id_paciente,
    });
  };

  const [lista_egresos, setlistaegresos] = useState([]);

  const crear_egreso = async (egreso) => {
    const res = await fetch(`${endpoint}/crear_egreso`, {
      method: "POST",
      body: JSON.stringify(egreso),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    //console.log(data);
    console.log(data);
    console.log(egreso);
    setLoading(false);
    setalertaegreso(true);
  };

  const cargar_datos_egreso = async (id_egreso) => {
    const res = await fetch(`${endpoint}/buscar_egreso/${id_egreso}`);
    const data = await res.json();
    setegreso({
      fecha_egreso: data.Fecha_Egreso,
      hora_egreso: data.Hora_Egreso,
      nombre_medico: data.Nombre_Medico,

      id_ingreso: data.ID_Ingreso,
      id_egreso: data.ID_Egreso,

      tipo_egreso: data.Tipo_Egreso,
    });
  };

  const eliminar_egreso = async (id_ingreso) => {
    const res = await fetch(`${endpoint}/eliminar_egreso/${id_ingreso}`, {
      method: "DELETE",
    });
    const data = await res.json();
  };

  //funcion cargar PACIENTES
  const cargar_egresos = async () => {
    const resp = await fetch(`${endpoint}/egresos`);
    //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
    const data = await resp.json(); //tranformo los datos para poder leer
    setlistaegresos(data);
  };

  let searchedEgresos = [];
  //barra de busqueda
  if (!searchValue.length >= 1) {
    searchedEgresos = lista_egresos;
  } else {
    searchedEgresos = lista_egresos.filter(
      (egreso) => egreso.DNI_Paciente == searchValue
    );
  }

  //---- barra busqueda

  const modificar_egreso = async (id_egreso) => {
    const resp = await fetch(`${endpoint}/modificar_egreso/${id_egreso}`, {
      method: "PUT",
      body: JSON.stringify(egreso),
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    setLoading(false);
    setalertaegreso(true);
  };

  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <egresocontext.Provider
      value={{
        fecha_desde,
        fecha_hasta,
        setfechadesde,
        setfechahasta,
        setsearchValue,
        searchValue,
        limpiar_egreso,
        egreso,
        setegreso,
        lista_egresos,
        setlistaegresos,
        crear_egreso,
        cargar_datos_egreso,
        eliminar_egreso,
        cargar_egresos,
        modificar_egreso,
        loading,
        setLoading,
        searchedEgresos,
        obtener_id_paciente,
        alertaegreso,
        setalertaegreso,
      }}
    >
      {children}
    </egresocontext.Provider>
  );
}
