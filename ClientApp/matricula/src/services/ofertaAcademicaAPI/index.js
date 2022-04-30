const API_URL = `http://localhost:9090/Matricula/api/ofertaAcademica`;

function getAllPorCarreraCiclo(carreraId, cicloId){
    return fetch(`${API_URL}/${carreraId}/${cicloId}`, {
      method: "GET",
    }).then(res => res.json())
  }

  function ofertaAcademicaAPI() {
    return{
        getAllPorCarreraCiclo
    }
}

export default ofertaAcademicaAPI