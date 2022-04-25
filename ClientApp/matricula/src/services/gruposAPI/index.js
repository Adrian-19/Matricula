const API_URL = `http://localhost:9090/Matricula/api/grupo`;


function getAllByProfesor(id) {
    return fetch(`${API_URL}/profesor/${id}`,{
        method:'GET'
    }).then(res => res.json())
  }

  function buscarGrupos(id, profesorId){
    return fetch(`${API_URL}/${profesorId}/${id}`,{
        method:'GET'
    }).then(res => res.json())
  }

  function gruposAPI() {
    return{
        getAllByProfesor,
        buscarGrupos
    }
}

export default gruposAPI