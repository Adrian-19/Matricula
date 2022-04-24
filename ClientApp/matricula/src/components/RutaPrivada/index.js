import { useContext } from "react"
import { Route } from "react-router-dom"
import { Redirect } from "react-router-dom"
import { AutenticacionContext } from "context/AutenticacionContext"
import { hasAccess } from "hooks/useRoutes"



function RutaPrivada({ rolesPermitidos = [], component, path, exact = false, ...rest }) {
  const { user, userRole, inProgress } = useContext(AutenticacionContext)
  if (inProgress) {
    return (
      <h1>Cargando..</h1>
    )
  }
  if (!inProgress && user === null) {
    return <Redirect to="/login" />
  }
  if (!hasAccess(rolesPermitidos, userRole)) {
    return <h1>401 | No tiene permiso para ver esto</h1>
  }
  return <Route exact={exact} path={path} component={component} {...rest} />
}

export default RutaPrivada; 