import { ConfigProvider } from "antd";
import esEs from "antd/lib/locale/es_ES"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import MantenimientoCursos from './pages/MantCursos';
import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-layout/dist/layout.css';
import 'antd/dist/antd.css';

// <Route path="/shop" component={Shop}/>

function App() {
  return (
    <ConfigProvider locale={esEs}>
    <Router>
      <Routes>
        <Route path="/" element={<MantenimientoCursos/>}/>
        <Route path="/cursos" element={<MantenimientoCursos/>}/>
      </Routes>
    </Router>
    </ConfigProvider>
  );
}

export default App;
