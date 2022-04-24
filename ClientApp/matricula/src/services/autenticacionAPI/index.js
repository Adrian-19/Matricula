const API_URL = `http://localhost:9090/Matricula/api`;


function login({ cedula, clave }) {
  const URL = `${API_URL}/autenticacion/login`
  const loginRequest = { cedula, clave }
  const requestInfo = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest)
  }
  return fetch(URL, requestInfo)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function autenticacionAPI() {
  return {
    login
  }
}

export default autenticacionAPI