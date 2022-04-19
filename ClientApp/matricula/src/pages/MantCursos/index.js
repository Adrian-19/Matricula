import { Row, Card, Col } from "antd";
import { Helmet } from "react-helmet";
import TablaCursos from "components/TablaCursos";

const MantenimientoCursos = () => {
  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Mantenimiento de Cursos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaCursos />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MantenimientoCursos;
