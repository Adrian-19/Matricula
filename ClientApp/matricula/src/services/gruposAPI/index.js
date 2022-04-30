const API_URL = `http://localhost:9090/Matricula/api/grupo`;


function getAllByProfesor(id) {
    return fetch(`${API_URL}/profesor/${id}`,{
        method:'GET'
    }).then(res => res.json())
  }

  function insertarGrupo({numeroGrupo, cicloId, cursoId, profesorId, horario}){
    const grupoRequest={
      numeroGrupo,
       cicloId, 
       cursoId, 
       profesorId, 
       horario
    }
    return fetch(API_URL, {
      method : 'POST',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify(grupoRequest),
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }

  function removeGrupo(id){
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }

  function buscarGrupos(id, profesorId){
    return fetch(`${API_URL}/${profesorId}/${id}`,{
        method:'GET'
    }).then(res => res.json())
  }

  function getAllByCurso(cursoId, cicloId) {
    return fetch(`${API_URL}/curso/${cursoId}/${cicloId}`,{
        method:'GET'
    }).then(res => res.json())
  }

  function updateGrupo({ id, numeroGrupo, cicloId, cursoId, profesorId, horario }) {
    const grupoRequest = {
      id,
      numeroGrupo, 
      cicloId, 
      cursoId, 
      profesorId, 
      horario
    };
    return fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grupoRequest),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
    });
  }

  function gruposAPI() {
    return{
        getAllByProfesor,
        buscarGrupos,
        getAllByCurso,
        updateGrupo,
        insertarGrupo,
        removeGrupo
    }
}

export default gruposAPI