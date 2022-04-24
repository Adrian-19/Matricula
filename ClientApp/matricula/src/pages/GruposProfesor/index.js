import { useState } from "react";
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import TablaAdministradores from "components/TablaAdmins";


const GruposProfesor = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const idProfesor = '1';
  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Mis Grupos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              {/** */}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GruposProfesor;