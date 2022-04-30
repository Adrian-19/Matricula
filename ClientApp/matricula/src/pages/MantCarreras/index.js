import { Row, Card, Col } from "antd";
import { Helmet } from "react-helmet";
import {useState} from 'react'
import TablaCarreras from "../../components/TablaCarreras";
import ContentHeader from "components/ContentHeader";

const MantenimientoCarreras = () =>{
    const [needsRefresh, setNeedsRefresh] = useState(true);
    return (
      <Row gutter={[0, 15]}>
        <ContentHeader title="Mantenimiento de carreras" />
        <Helmet>
          <title>Mantenimiento de Carreras</title>
        </Helmet>
        <Col span={24}>
          <Card>
            <Row justify="center">
              <Col span={24}>

                <TablaCarreras needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh}/>

              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
}

export default MantenimientoCarreras