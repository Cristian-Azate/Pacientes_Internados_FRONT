import {useAuth} from '../context/authContext'
import {Navigate} from 'react-router-dom'
import Navbar from "./Navbar";


//Hijos protejidos sin haber estado autenticado
export function ProtectedRoute({children}) {
    const {user,loading} = useAuth()

    if (!user) return <Navigate to='/login'/>

    if (loading) return <h1>Cargando Usuario</h1>

    return <><Navbar />{children}</>
}