const API_URL = `http://localhost:9090/Matricula/api/curso`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }

  function insertarCurso({id, codigo, carreraId, cicloId, nombre, creditos, horas_semanales}){
    const cursoRequest={
        id,
        codigo,
        carreraId,
        cicloId,
        nombre,
        creditos,
        horas_semanales
    }
    return fetch(API_URL, {
      method : 'POST',
      headers:{"Content-Type":"application/json"},
      body : JSON.stringify(cursoRequest),
    }).then(res=>{
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
  }

function updateCurso({id, codigo, carreraId, cicloId, nombre, creditos, horas_semanales}){
    const cursoRequest={
        id,
        codigo,
        carreraId,
        cicloId,
        nombre,
        creditos,
        horas_semanales
    }
    console.log(cursoRequest);
    return fetch(API_URL, {
        method : 'PUT',
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify(cursoRequest),
      }).then(res=>{
        if(!res.ok){
          throw new Error(res.status)
        }
      })
}


function removeCurso(id){
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(res=>{
    if(!res.ok){
      console.log("why tho? : ", res.status)
      throw new Error(res.status)
    }
    return res.json()
  })
}

function cursosAPI() {
    return{
        getAll,
        insertarCurso,
        updateCurso,
        removeCurso
    }
}

export default cursosAPI