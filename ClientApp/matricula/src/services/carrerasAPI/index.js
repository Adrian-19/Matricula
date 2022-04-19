const API_URL = `http://localhost:9090/Matricula/api/carrera`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }

function carrerasAPI() {
    return{
        getAll
    }
}

export default carrerasAPI