import { useContext, useEffect, useState } from "react"
import  {AutenticacionContext}  from "context/AutenticacionContext"
import {
  AppstoreOutlined,
} from '@ant-design/icons';


export const AppRoutes = [
  {
    name: "Inicio",
    path: "",
    icon: <AppstoreOutlined />,
    subroutes: null,
    key: '1',
    rolesAllowed: ["publico"]
  },
  {
    name: "Historial",
    path: "miHistorial",
    icon: <AppstoreOutlined />,
    subroutes: null,
    key: '2',
    rolesAllowed: ["Alumno"]
  },
  {
    name: "Matrícula",
    path: "matricula",
    icon: <AppstoreOutlined />,
    subroutes: null,
    key: '3',
    rolesAllowed: ["Alumno", "Administrador"]
  }, {
    name: "Profesores",
    path: "profesores",
    icon: <AppstoreOutlined />,
    subroutes: null,
    key: '4',
    rolesAllowed: ["Administrador"]

  }, {
    name: "Alumnos",
    path: "alumnos",
    icon: <AppstoreOutlined />,
    subroutes: null,
    key: '100',
    rolesAllowed: ["Administrador", "Matriculador"]
  },{
    name: "Cursos",
    path: "cursos",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '5',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Carreras",
    path: "carreras",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '6',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Ciclos",
    path: "ciclos",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '7',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Registro de Notas",
    path: "misGrupos",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '7',
    rolesAllowed: ["Profesor"]
  },
  {
    name: "Seguridad",
    path: "usuarios",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '8',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Oferta Académica",
    path: "ofertaAcademica",
    icon: <AppstoreOutlined/>,
    subroutes: null,
    key: '9',
    rolesAllowed: ["Administrador"]
  },
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