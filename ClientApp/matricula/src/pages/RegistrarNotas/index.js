import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import { AutenticacionContext } from "context/AutenticacionContext";
import { useParams } from "react-router-dom";
import TablaRegistrarNotas from "components/TablaRegistrarNotas";

const RegistrarNotas = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const { user } = useContext(AutenticacionContext);
  const { id } = useParams();

  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Registrar Notas</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaRegistrarNotas
                needsRefresh={needsRefresh}
                setNeedsRefresh={setNeedsRefresh}
                idProfesor={user.usuario.id}
                grupoId={id}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default RegistrarNotas;
