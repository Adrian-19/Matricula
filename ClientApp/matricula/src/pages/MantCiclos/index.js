import {useState} from 'react'
import { Helmet } from "react-helmet";
import { Row, Card, Col } from "antd";
import TablaCiclos from 'components/TablaCiclos';

const MantenimientoCiclos = () =>{
    const [needsRefresh, setNeedsRefresh] = useState(true);
    return (
        <Row gutter={[0, 15]}>
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