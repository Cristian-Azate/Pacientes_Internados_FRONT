import React from "react";
import { createContext,useState } from "react"; //definir proveedor y crear y devolver objetos
import { endpoint } from "../components/EndPoint";

//contiene el calor del paciente
export const ingresocontext = createContext();

//este componente va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso props.children
//TIENE TODA LA LOGICA DE LA APP -
export function IngresoProvider({ children }) {
  const[loading,setLoading] = useState(false);
  const[alertaingreso,setAlertaingreso] = useState(false);

  const[searchValue,setsearchValue] = useState('');

  let date = new Date();
  let horas="";
  let minutos="";

  const[fecha_desde,setfechadesde] = useState(date.toISOString().split('T')[0]);
  const[fecha_hasta,setfechahasta] = useState(date.toISOString().split('T')[0]);
  
  if (date.getHours()<=9)
  {
    horas="0"+date.getHours();
  }
  else  
    horas=date.getHours();

    if (date.getMinutes()<=9)
    {
      minutos="0"+date.getMinutes();
    }
    else  
    minutos=date.getMinutes();


  const [ingreso, setingreso] = useState({
    fecha_ingreso: date.toISOString().split('T')[0],
    hora_ingreso: horas+":" + minutos,
    nombre_medico: "",
    numero_ficha_internacion: "",
    unidad_internacion: "",
    numero_cama: "",

    id_ingreso: 0,
    
    id_paciente:0,
    tipo_ingreso:"ASISTENCIA DE 3ROS",

    id_condicion:0,
  });

  const limpiar_ingreso = () => {
    setingreso({
        fecha_ingreso: date.toISOString().split('T')[0],
        hora_ingreso:  horas+":" + minutos,
        nombre_medico: "",
        numero_ficha_internacion: "",
        unidad_internacion: "",
        numero_cama: "",

        id_ingreso: 0,
        id_paciente: 0,

        tipo_ingreso:"",
        id_condicion:0,
    });
  };

  const obtener_id_paciente = (paciente) => {
    setingreso({
      id_paciente: paciente.id_paciente,  
    });
  };
    
    const [lista_ingresos, setlistaingresos] = useState([]);

    const crear_ingreso = async (ingreso) => {
      const res = await fetch(`${endpoint}/crear_ingreso`, {
        method: "POST",
        body: JSON.stringify(ingreso),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      //console.log(data);
      console.log(data);
      console.log(ingreso);
      setLoading(false);
      setAlertaingreso(true);
      };
      
    const cargar_datos_ingreso = async (id_ingreso) => {
        const res = await fetch(`${endpoint}/buscar_ingreso/${id_ingreso}`);
        const data = await res.json();
        setingreso({
          fecha_ingreso: data.Fecha_Ingreso,
          hora_ingreso:  data.Hora_Ingreso,
          nombre_medico: data.Nombre_Medico,
          numero_ficha_internacion: data.Numero_Ficha_Internacion,
          unidad_internacion: data.Unidad_Internacion,
          numero_cama: data.Numero_Cama,

          id_ingreso: data.ID_Ingreso,

          tipo_ingreso: data.Tipo_Ingreso,

        });
      };

    const eliminar_ingreso = async (id_ingreso) => {
        const res = await fetch(`${endpoint}/eliminar_ingreso/${id_ingreso}`, {
            method: "DELETE",
          });
        const data = await res.json();
      };

     //funcion cargar PACIENTES
    const cargar_ingresos = async () => {
        const resp = await fetch(`${endpoint}/ingresos`);
        //const resp = await fetch(`http://192.168.0.107:4000/pacientes`);   //NOTEBOOK
        const data = await resp.json(); //tranformo los datos para poder leer
        setlistaingresos(data);
      };

      

      let searchedIngresos=[];
      //barra de busqueda
        if (!searchValue.length>=1){       
          searchedIngresos=lista_ingresos;
        }
        else
        {
            searchedIngresos = lista_ingresos.filter(ingreso =>
            ingreso.DNI_Paciente==searchValue);
        }
         
      
      //---- barra busqueda
    
  
    const modificar_ingreso = async (id_ingreso) => {
      const resp = await fetch(`${endpoint}/modificar_ingreso/${id_ingreso}`, {
        method: "PUT",
        body: JSON.stringify(ingreso),
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      setLoading(false);
      setAlertaingreso(true);
    };

    return (
      //todos componenetes hijo podra acceder a los datos de este componente padre
      //el valor es un objeto
      <ingresocontext.Provider value={{fecha_desde,fecha_hasta,setfechadesde,setfechahasta,setsearchValue,searchValue,limpiar_ingreso,ingreso,setingreso,lista_ingresos,setlistaingresos,crear_ingreso,cargar_datos_ingreso,eliminar_ingreso,cargar_ingresos,modificar_ingreso,loading,setLoading,alertaingreso,setAlertaingreso,searchedIngresos,obtener_id_paciente}}>{children}</ingresocontext.Provider>
    );
  }