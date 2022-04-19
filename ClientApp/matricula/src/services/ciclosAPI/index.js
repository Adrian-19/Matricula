const API_URL = `http://localhost:9090/Matricula/api/ciclo`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }

function ciclosAPI() {
    return{
        getAll
    }
}

export default ciclosAPI