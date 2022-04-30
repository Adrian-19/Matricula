import {useState} from 'react'
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import TablaCiclos from 'components/TablaCiclos';
import ContentHeader from 'components/ContentHeader';

const MantenimientoCiclos = () =>{
    const [needsRefresh, setNeedsRefresh] = useState(true);
    return (
        <Row gutter={[0, 15]}>
          <ContentHeader title="Mantenimiento de ciclos" />
          <Helmet>
            <title>Mantenimiento de Ciclos</title>
          </Helmet>
          <Col span={24}>
            <Card>
              <Row justify="center">
                <Col span={24}>
                <TablaCiclos needsRefresh = {needsRefresh} setNeedsRefresh={setNeedsRefresh} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      );
}

export default MantenimientoCiclos;