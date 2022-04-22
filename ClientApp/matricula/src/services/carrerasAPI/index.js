const API_URL = `http://localhost:9090/Matricula/api/carrera`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }


  function insertarCarerra({codigo, nombre, titulo}){
    const carerraRequest={
        codigo,
        nombre,
        titulo,
    }
    return fetch(API_URL, {
      method : 'POST',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify(carerraRequest),
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
    })
  }

  function updateCarrera({id, codigo, nombre, titulo}){
    const carerraRequest={
        id,
        codigo,
        titulo,
        nombre,
    }
    console.log(carerraRequest);
    return fetch(API_URL, {
        method : 'PUT',
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify(carerraRequest),
      }).then(res=>{
        if(!res.ok){
          throw new Error(res.status)
        }
      })
}

function removeCarrera(id){
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(res=>{
    if(!res.ok){
      throw new Error(res.status)
    }
  })
}


function carrerasAPI() {
    return{
        getAll,
        updateCarrera,
        removeCarrera,
        insertarCarerra
    }
}

export default carrerasAPI