import { useContext, useEffect, useState } from "react"
import { AutenticacionContext } from "context/AutenticacionContext"
import {
  AppstoreOutlined,
} from '@ant-design/icons';


export const AppRoutes = [
  {
    name: "Inicio",
    path: "",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '1',
    rolesAllowed: ["publico"]
  },
  {
    name: "Mi historial académico",
    path: "miHistorial",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '2',
    rolesAllowed: ["Alumno"]
  },
  {
    name: "Matrícula",
    path: "matricula",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '3',
    rolesAllowed: ["Alumno", "Administrador"]
  },{
    name: "Profesores",
    path: "profesores",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '4',
    rolesAllowed: ["Administrador"]
  },{
    name: "Alumnos",
    path: "alumnos",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '100',
    rolesAllowed: ["Administrador"]
  }
]

export function hasAccess(rolesAllowed, userRole) {
  if (rolesAllowed.includes("publico")) {
    return true
  }
  for (let roleAllowed of rolesAllowed) {
    if (roleAllowed === userRole) {
      return true
    }
  }
  return false
}

export default function useRoutes() {
  const { userRole } = useContext(AutenticacionContext)
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    if (userRole === null) {
      return
    }
    setRoutes(AppRoutes.filter(route => {
      return hasAccess(route.rolesAllowed, userRole)
    }))
  }, [userRole])


  return { routes }
}