// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' //conexion a la autenticacion
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfI5mqbUEigtkEo8tpk5aC3lyLa3oXV5k",
  authDomain: "react-fb-auth-57483.firebaseapp.com",
  projectId: "react-fb-auth-57483",
  storageBucket: "react-fb-auth-57483.appspot.com",
  messagingSenderId: "347912730363",
  appId: "1:347912730363:web:9d4b82cfedc5cbb6c1225e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //retorna una intancia autenticada de firebase //logear 


