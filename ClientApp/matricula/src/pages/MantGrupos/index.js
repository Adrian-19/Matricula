import { Row, Card, Col } from "antd";
import { Helmet } from "react-helmet";
import {useState} from 'react'
import { useParams } from "react-router-dom";
import TablaGrupos from "components/TablaGrupos";

const MantenimientoGrupos = () => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const {cursoId, cicloId} = useParams()
  return (
    <Row gutter={[0, 15]}>
      <Helmet>
        <title>Mantenimiento de Grupos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaGrupos cursoId={cursoId} cicloId={cicloId} needsRefresh = {needsRefresh} setNeedsRefresh={setNeedsRefresh} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MantenimientoGrupos;