import { ConfigProvider } from "antd";
import esEs from "antd/lib/locale/es_ES"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import 'antd/dist/antd.css';
import MantenimientoCursos from './pages/MantCursos';
import MantenimientoCarreras from "./pages/MantCarreras";
import MantenimientoCiclos from "pages/MantCiclos";
import MantenimientoAdministradores from "pages/MantAdmins";
import GruposProfesor from "pages/GruposProfesor";

import Login from 'pages/Login';
import MainLayout from "components/MainLayout";
import RutaPrivada from "components/RutaPrivada";
import AutenticacionContextProvider from "context/AutenticacionContext";
import HomePage from "pages/Home";
import MantenimientoProfesores from "pages/MantenimientoProfesores";
import RegistrarNotas from "pages/RegistrarNotas";
import MantenimientoAlumnos from "pages/MantenimientoAlumnos";

function App() {
  return (
    <ConfigProvider locale={esEs}>
      <Router>
        <AutenticacionContextProvider>
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route path="/">
              <MainLayout>
                <Switch>
                  <RutaPrivada rolesPermitidos={["publico"]} exact path="/" component={HomePage} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/profesores" component={MantenimientoProfesores} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/alumnos" component={MantenimientoAlumnos} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/cursos" component={MantenimientoCursos} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/carreras" component={MantenimientoCarreras} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/ciclos" component={MantenimientoCiclos} />
                  <RutaPrivada rolesPermitidos={["Administrador"]} exact path="/usuarios" component={MantenimientoAdministradores}/>
                  <RutaPrivada rolesPermitidos={["Profesor"]} exact path="/misGrupos" component={GruposProfesor}/>
                  <RutaPrivada rolesPermitidos={["Administrador"]} path="/cursos/:id" component={MantenimientoCursos} />
                  <RutaPrivada rolesPermitidos={["Profesor"]} exact path="/misGrupos/:id" component={RegistrarNotas}/>
                  <Route path={"*"} component={() => <h1>Not found</h1>} />
                </Switch>
              </MainLayout>
            </Route>
          </Switch>
        </AutenticacionContextProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
