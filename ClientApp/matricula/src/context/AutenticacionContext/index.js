import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import autenticacionAPI from "services/autenticacionAPI"




const AutenticacionContext = React.createContext({});

function useLocalAutenticacion() {
  const [state, setState] = useState({ user: null, inProgress: true, userRole: null })
  const history = useHistory();

  useEffect(() => {
    console.log("RECUPERANDO")
    const localUser = JSON.parse(window.localStorage.getItem("user"))
    console.log("LOCAL USER", localUser);
    if (localUser !== null) {
      autenticacionAPI().login(localUser.user)
        .then(user => {
          console.log("RES", user)
          if (user.rol === "Administrador" || user.rol === "Matriculador") {
            window.localStorage.setItem("user", JSON.stringify({ user: user, usuario: { nombre: user.rol } }))
            setState({ user: {...user, usuario: { nombre: user.rol}}, userRole: user.rol, inProgress: false })
          }
          else {
            window.localStorage.setItem("user", JSON.stringify({ user: user, usuario: { nombre: user.rol } }))
            setState({ user: user, userRole: user.rol, inProgress: false })
          }
        })
        .catch(err => {
          console.log(err)
          window.localStorage.removeItem("user")
          setState({ user: null, userRole: null, inProgress: false });
        })
    } else {
      setState(prev => ({ ...prev, inProgress: false }))
    }
  }, [])
  const setUser = useCallback(user => {
    setState(prev => ({ ...prev, userRole: user.rol, user: user }))
    localStorage.setItem("user", JSON.stringify({ user: user }))
  }, [])
  const logout = useCallback(() => {
    window.localStorage.removeItem("user")
    setState({ user: null, userRole: null, inProgress: false })
    history.push("/login")
  }, [history])
  return {
    user: state.user,
    inProgress: state.inProgress,
    userRole: state.userRole,
    setUser,
    logout
  }
}

function AutenticacionContextProvider({ children }) {
  const autenticacion = useLocalAutenticacion();
  return (
    <AutenticacionContext.Provider value={{ ...autenticacion }}>
      {children}
    </AutenticacionContext.Provider>
  );
}

export default AutenticacionContextProvider
export { AutenticacionContext };