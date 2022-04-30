import { useState } from "react";
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import TablaAdministradores from "components/TablaAdmins";
import ContentHeader from "components/ContentHeader";


const MantenimientoAdministradores = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  return (
    <Row gutter={[0, 15]}>
      <ContentHeader title="Seguridad" />
      <Helmet>
        <title>Mantenimiento de Administradores</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaAdministradores
                needsRefresh={needsRefresh}
                setNeedsRefresh={setNeedsRefresh}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MantenimientoAdministradores;
