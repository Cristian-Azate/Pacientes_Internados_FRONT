import { createContext, useEffect,useState } from "react"; //definir proveedor y crear y devolver objetos
import { useContext } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,signOut,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import {auth } from '../firebase' //mi auth

//CONTIENE EL VALOR ---user
export const authcontext = createContext();

export const useAuth = () => {
  const context = useContext(authcontext); //devuelve el valor

  if (!context) throw new Error("No hay un AuthProvider"); //si no esta el provider

  return context;
};

//FUNCION NOS PERMITE UTILIZAR EL VALOR EN CUALQUIER COMPONENTE
//este retorna componente <> de authcontext va a envolver a toda la aplicacion
//necesitamos que el componente tenga por dentro a cualquier componete por eso children
//todo lo que este en AuthProvider podran a acceder a su contenido
export function AuthProvider({ children }) {

  const [user, setUser] = useState(null) 
  const [loading, setLoading] = useState(true)

  const signup = (email,password) => 
    createUserWithEmailAndPassword(auth,email,password)
  
  const login = async(email,password) => 
  signInWithEmailAndPassword(auth,email,password)

  const loginWithGoogle = () => {
   const googleProvider = new GoogleAuthProvider()
   signInWithPopup(auth,googleProvider) //elijo el tipo de cuentra hacer login
  }

  const logout = (email,password) => 
  signOut(auth)
  
  //retona el usuario cada vez que cambia su estado  ---login logout
  useEffect(()=>{
    //es una escucha
    const unsuscribe = onAuthStateChanged(auth,currentuser => { //cuando logout currentuser se vuelve null
    setUser(currentuser)
    setLoading(false)
   })

    return () => unsuscribe() //cuando el elemento cambio ejecuto recien busco
  },[])


  return (
    //todos componenetes hijo podra acceder a los datos de este componente padre
    //el valor es un objeto
    <authcontext.Provider value={{ signup,login,user,logout,loading,loginWithGoogle}}>{children}</authcontext.Provider>
  );
}
