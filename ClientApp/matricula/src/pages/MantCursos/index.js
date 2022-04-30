import { Row, Card, Col } from "antd";
import { Helmet } from "react-helmet";
import TablaCursos from "components/TablaCursos";
import {useState} from 'react'
import { useParams } from "react-router-dom";
import ContentHeader from "components/ContentHeader";

const MantenimientoCursos = ({idProp=null, cicloIdProp=null}) => {
  const [needsRefresh, setNeedsRefresh] = useState(true);
  const {id, cicloId} = useParams()
  return (
    <Row gutter={[0, 15]}>
      <ContentHeader title="Mantenimiento de cursos" />
      <Helmet>
        <title>Mantenimiento de Cursos</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <TablaCursos cicloId={typeof(cicloId) === "undefined" && cicloIdProp !== null ? cicloIdProp : cicloId} carreraId={typeof(id) === "undefined" && idProp !== null ? idProp : id} needsRefresh = {needsRefresh} setNeedsRefresh={setNeedsRefresh} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default MantenimientoCursos;
