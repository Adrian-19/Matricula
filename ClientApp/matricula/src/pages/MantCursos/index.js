import { Row, Card, Col } from "antd";
import { Helmet } from "react-helmet";
import TablaCursos from "components/TablaCursos";
import {useState} from 'react'
import { useParams } from "react-router-dom";

const MantenimientoCursos = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const {id} = useParams()
  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Mantenimiento de Cursos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaCursos carreraId={id} needsRefresh = {needsRefresh} setNeedsRefresh={setNeedsRefresh} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MantenimientoCursos;
