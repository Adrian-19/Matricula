const API_URL = `http://localhost:9090/Matricula/api/matricula`;

function getAllByGrupo(id) {
  return fetch(`${API_URL}/grupo/${id}`, {
    method: 'GET'
  }).then(res => res.json())
}

function updateMatricula({ id, nota }) {
  const matriculaRequest = {
    id,
    nota
  }
  return fetch(API_URL, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(matriculaRequest),
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status)
    }
  })
}

function insertarMatricula({ numero, alumnoId, grupoId, nota = 0 }) {
  
  const matricula = {numero, alumnoId, grupoId, nota}
  
  return fetch(API_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(matricula),
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.status)
    }
  })
}


function matriculasAPI() {
  return {
    getAllByGrupo,
    updateMatricula,
    insertarMatricula
  }
}

export default matriculasAPI