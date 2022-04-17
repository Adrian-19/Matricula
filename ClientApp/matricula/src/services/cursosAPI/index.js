const API_URL = `http://localhost:9090/Matricula/api/curso`;

function getAll() {
    return fetch(API_URL,{
        method:'GET'
    }).then(res => res.json())
  }

function cursosAPI() {
    return{
        getAll
    }
}

export default cursosAPI