import { useContext, useEffect, useState } from "react"
import { AutenticacionContext } from "context/AutenticacionContext"

export const AppRoutes = [
  {
    name: "Inicio",
    path: "",
    icon: null,
    subroutes: null,
    key: '1',
    rolesAllowed: ["publico"]
  },
  {
    name: "Mi historial académico",
    path: "miHistorial",
    icon: null,
    subroutes: null,
    key: '2',
    rolesAllowed: ["Alumno"]
  },
  {
    name: "Matrícula",
    path: "matricula",
    icon: null,
    subroutes: null,
    key: '3',
    rolesAllowed: ["Alumno", "Administrador"]
  },{
    name: "Mantenimiento de profesores",
    path: "mantenimientoProfesores",
    icon: null,
    subroutes: null,
    key: '4',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Mantenimiento de Cursos",
    path: "cursos",
    icon: null,
    subroutes: null,
    key: '5',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Mantenimiento de Carreras",
    path: "carreras",
    icon: null,
    subroutes: null,
    key: '6',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Mantenimiento de Ciclos",
    path: "ciclos",
    icon: null,
    subroutes: null,
    key: '7',
    rolesAllowed: ["Administrador"]
  },
  {
    name: "Registro de Notas",
    path: "misGrupos",
    icon: null,
    subroutes: null,
    key: '7',
    rolesAllowed: ["Profesor"]
  },
  {
    name: "Seguridad",
    path: "usuarios",
    icon: null,
    subroutes: null,
    key: '8',
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