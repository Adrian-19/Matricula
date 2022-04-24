const API_URL = `http://localhost:9090/Matricula/api`;



function buscarProfesores() {
  const URL = `${API_URL}/profesor`
  return fetch(URL)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function buscarProfesor({cedula}) {
  const URL = `${API_URL}/profesor/${cedula}`
  return fetch(URL)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function addProfesor({cedula,nombre,telefono,email}) {
  const URL = `${API_URL}/profesor`
  const profesor = { cedula,nombre,telefono,email }
  const requestInfo = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profesor)
  }
  return fetch(URL, requestInfo)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function modificarProfesor({id,cedula,nombre,telefono,email}) {

  console.log("PROFESOR A MODIFICAR: ",id,cedula,nombre,telefono,email)
  const URL = `${API_URL}/profesor`
  const profesor = { id, cedula,nombre,telefono,email }
  const requestInfo = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profesor)
  }
  return fetch(URL, requestInfo)
    .then((res) => res);
}

function eliminarProfesor({id}) {
  const URL = `${API_URL}/profesor/${id}`
  const requestInfo = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }
  return fetch(URL, requestInfo)
    .then((res) => res);
}





function profesoresAPI() {
  return {
    buscarProfesores,
    buscarProfesor,
    addProfesor,
    modificarProfesor,
    eliminarProfesor
  }
}

export default profesoresAPI