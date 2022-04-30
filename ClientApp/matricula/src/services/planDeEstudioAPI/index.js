const API_URL = `http://localhost:9090/Matricula/api/planEstudio`;

function getAllPorCarrera(id){
    return fetch(`${API_URL}/${id}`, {
      method: "GET",
    }).then(res => res.json())
  }

  function insertarPlan({cursoId, carreraId}){
    const planRequest={
        cursoId,
        carreraId
    }
    return fetch(API_URL, {
      method : 'POST',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify(planRequest),
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }

  function removePlan(id){
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }

  function planDeEstudioAPI() {
    return{
        getAllPorCarrera,
        insertarPlan,
        removePlan
    }
}

export default planDeEstudioAPI