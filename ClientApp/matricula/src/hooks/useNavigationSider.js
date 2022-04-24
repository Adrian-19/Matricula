import { useLocation } from "react-router-dom"
import useRoutes from "./useRoutes"

function useNavigationSider() {
  const { pathname } = useLocation()
  const { routes } = useRoutes()
  const matchRoute = routes.find(({ path }) => {
    if (pathname !== '/' && path === '') {
      return false
    }
    console.log("PATH ROUTE: ", path, "--->", "REACT PATH: ", pathname)
    return pathname.match(new RegExp(`/(${path})`)) !== null
  })
  console.log("Rutas y matchRoute", routes, matchRoute)
  const key = matchRoute !== undefined ? matchRoute.key : '0'
  return {
    routes,
    matchRoute,
    key
  }
}

export default useNavigationSider