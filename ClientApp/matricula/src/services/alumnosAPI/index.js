const API_URL = `http://localhost:9090/Matricula/api`;



function buscarAlumnos() {
  const URL = `${API_URL}/alumno`
  return fetch(URL)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function buscarAlumno({ cedula }) {
  const URL = `${API_URL}/alumno/${cedula}`
  return fetch(URL)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function buscarCursosAlumno({id}){
  const URL = `${API_URL}/alumno/${id}/cursos`
  return fetch(URL)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}


function addAlumno({ carreraId, cedula, email, fechaNacimiento, nombre, telefono }) {
  const URL = `${API_URL}/alumno`
  const alumno = { carreraId, cedula, email, fechaNacimiento, nombre, telefono }
  const requestInfo = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alumno)
  }
  return fetch(URL, requestInfo)
    .then((res) => {
      if (!res.ok)
        throw res.status;
      return res.json();
    });
}

function modificarAlumno({ id, carreraId, cedula, email, fechaNacimiento, nombre, telefono }) {

  console.log("ALUMNO A MODIFICAR: ", "id: ",id, "carreraId: ",carreraId, "cedula: ",cedula, "email: ",email, "fechaNacimiento: ",fechaNacimiento, "nombre: ",nombre, "telefono: ",telefono )
  const URL = `${API_URL}/alumno`
  const alumno = { id, carreraId, cedula, email, fechaNacimiento, nombre, telefono }
  const requestInfo = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alumno)
  }
  return fetch(URL, requestInfo)
    .then((res) => res);
}

function eliminarAlumno({ id }) {
  const URL = `${API_URL}/alumno/${id}`
  const requestInfo = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
    },
  }
  return fetch(URL, requestInfo)
    .then((res) => res);
}





function alumnosAPI() {
  return {
    buscarAlumnos,
    buscarAlumno,
    buscarCursosAlumno,
    addAlumno,
    modificarAlumno,
    eliminarAlumno
  }
}

export default alumnosAPI