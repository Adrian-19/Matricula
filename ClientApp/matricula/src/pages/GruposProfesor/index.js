import { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import { AutenticacionContext } from "context/AutenticacionContext";
import TablaGruposProfesor from "components/TablaGruposProfesor";


const GruposProfesor = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const { user } = useContext(AutenticacionContext)
  console.log(user)
  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Mis Grupos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaGruposProfesor needsRefresh = {needsRefresh} setNeedsRefresh={setNeedsRefresh} idProfesor={user.usuario.id}/>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GruposProfesor;