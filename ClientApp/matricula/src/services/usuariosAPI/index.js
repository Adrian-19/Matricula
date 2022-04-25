const API_URL = `http://localhost:9090/Matricula/api/usuario`;

function getAllAdmins() {
  return fetch(API_URL, {
    method: "GET",
  }).then((res) => res.json());
}

function updateUsuario({ id, cedula, clave, rol }) {
  const usuarioRequest = {
    id,
    cedula,
    clave,
    rol,
  };
  return fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioRequest),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
  });
}

function removeUsuario(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
  });
}

function insertarUsuario({ cedula, clave, rol }) {
  const usuarioRequest = {
    cedula,
    clave,
    rol,
  };
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioRequest),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
  });
}

function usuariosAPI() {
  return {
    getAllAdmins,
    updateUsuario,
    removeUsuario,
    insertarUsuario,
  };
}

export default usuariosAPI;
