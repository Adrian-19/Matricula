const API_URL = `http://localhost:9090/Matricula/api/ciclo`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }

  function insertarCiclo({annio, numero, fechaInicio, fechaFinal, activo}){
    const cicloRequest={
        annio,
        numero,
        fechaInicio,
        fechaFinal,
        activo
    }
    return fetch(API_URL, {
      method : 'POST',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify(cicloRequest),
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }
 
  function updateCiclos({id, annio, numero, fechaInicio, fechaFinal, activo}){
    const cicloRequest={
        id,
        annio,
        numero,
        fechaInicio,
        fechaFinal,
        activo
    }
    console.log("cicloRequest: ", cicloRequest);
    return fetch(API_URL, {
        method : 'PUT',
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify(cicloRequest),
      }).then(res=>{
        if(!res.ok){
          throw new Error(res.status)
        }
      })
}

function removeCiclo(id){
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(res=>{
    if(!res.ok){
      throw new Error(res.status)
    }
  })
}

function ciclosAPI() {
    return{
        getAll,
        updateCiclos,
        insertarCiclo,
        removeCiclo
    }
}

export default ciclosAPI