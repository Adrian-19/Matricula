import { Row, Card, Col, Form, Input, Select, Button, notification, Divider } from "antd";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TablaGrupos from "components/TablaGrupos";
import carrerasAPI from "services/carrerasAPI";
import ciclosAPI from "services/ciclosAPI";
import TablaCursos from "components/TablaCursos";
import ContentHeader from "components/ContentHeader";

const OfertaAcademica = ({needsRefresh, setNeedsRefresh}) => {
  
  const [form] = Form.useForm();
  const [search, setSearch] = useState({
    searchCarrera: "999",
    searchCiclo: "999",
  });
  const [carreras, setCarreras] = useState([]);
  const [ciclos, setCiclos] = useState([]);

  const { Option } = Select;

  const onFinish = () =>{
      const values = form.getFieldsValue()
    form.validateFields(["carrera","ciclo"])
    .then(()=>{
        setSearch((prev)=>({
            ...prev,
            searchCarrera:values.carrera,
            searchCiclo:values.ciclo
        }))
        if (needsRefresh === true) {
            setNeedsRefresh(false);
          } else {
            setNeedsRefresh(true);
          }
        console.log("cambiaron")
    }).catch((error)=>{
        notification.error({
            message:"Error",
            description:"Debe de elegir la carrera y el ciclo para realizar la búsqueda"
        })
    })
  }

  useEffect(() => {
      carrerasAPI()
      .getAll()
      .then((newCarreras)=>{
        setCarreras(newCarreras)
        ciclosAPI()
        .getAll()
        .then((newCiclos)=>{
            setCiclos(newCiclos)
        })
      })
      .catch((error)=>{
          notification.error({
              message:"Error",
              description:"Ha ocurrido un error. Por favor, intente de nuevo"
          })
      })
  }, []);

  return (
    <Row gutter={[0, 15]}>
        <ContentHeader title="Oferta Académica" />
      <Helmet>
        <title>Oferta Academica</title>
      </Helmet>
      <Col span={24}>
        <Card>
          <Row justify="center">
            <Col span={24}>
              <Form form={form} layout="vertical" autoComplete="off">
                <Form.Item
                  name="carrera"
                  label="Carrera"
                  rules={[{ required: true, message: "Seleccione una carrera" }]}
                >
                  <Select style={{width:'50%'}} placeholder="Seleccione una carrera">
                    {carreras.map((carrera) => (
                      <Option value={carrera.id}>{carrera.nombre}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                
                  name="ciclo"
                  label="Ciclo"
                  rules={[{ required: true, message: "Seleccione un ciclo" }]}
                >
                  <Select style={{width:'50%'}} placeholder="Seleccione un ciclo">
                    {ciclos.map((ciclo) => (
                      <Option value={ciclo.id}>{ciclo.numero} - {ciclo.annio}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>
              <Button onClick={onFinish} type="primary" shape="round" >Buscar</Button>
              <Divider />
              <TablaCursos needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} cicloId={search.searchCiclo} carreraId={search.searchCarrera} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default OfertaAcademica;
