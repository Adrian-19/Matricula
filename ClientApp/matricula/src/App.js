import { ConfigProvider } from "antd";
import esEs from "antd/lib/locale/es_ES"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import 'antd/dist/antd.css';
import MantenimientoCursos from './pages/MantCursos';
import MantenimientoCarreras from "./pages/MantCarreras";

// <Route path="/shop" component={Shop}/>

function App() {
  return (
    <ConfigProvider locale={esEs}>
    <Router>
      <Routes>
        <Route path="/cursos" exact element={<MantenimientoCursos/>}/>
        <Route path="/carreras" element={<MantenimientoCarreras/>}/>
        <Route path="/cursos/:id" element={<MantenimientoCursos/>}/>
      </Routes>
    </Router>
    </ConfigProvider>
  );
}

export default App;
