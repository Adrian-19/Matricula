import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button, Card, Col, Form, Input, Row } from "antd"
import { Link } from 'react-router-dom'
import Typography from "components/Typography"
import autenticacionAPI from "services/autenticacionAPI"
import "./index.css"
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined
} from "@ant-design/icons"
import { AutenticacionContext } from "context/AutenticacionContext"
import { Redirect } from "react-router-dom"

const InputClave = Input.Password; 

const inputIconProps = {
  style: {
    fontSize: "20px",
    color: "#838AA5"
  }
}

const claveIconRender = (visible) => {
  return visible ?
    <EyeOutlined {...inputIconProps} />
    : <EyeInvisibleOutlined {...inputIconProps} />
}

function Login() {
  const [isLoginLoading, setIsLoginLoading] = useState()
  const [form] = Form.useForm()
  const history = useHistory()
  const {user, setUser, inProgress } = useContext(AutenticacionContext)

  if(inProgress) {
    return null
  }

  if(user !== null && !inProgress) {
    return <Redirect to="/"/>
  }

  console.log("herelog")
  const onLogin = (values) => {
    const { cedula, clave } = values
    if (cedula === '' || clave === '') {
      return
    }
    setIsLoginLoading(true)
    autenticacionAPI().login({ cedula, clave })
      .then(user => {
        console.log("LoginResponse ->", user)
        if(user.rol === "Administrador" || user.rol === "Matriculador"){
          setUser({ ...user, usuario:{nombre:user.rol}})
        }else{
          setUser(user)
        }

        
        history.push("/");
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoginLoading(false)
      })
  }

  return (
    <>
      <div className="loginPage" >
        <div className="formContainer">

          <Card className="form" bordered={false}>
            <Row gutter={[0, 30]}>
              <Col span={24} >

                <Typography align="center" variant="h2" margin='7px 0 24px 0' ellipsis={true} weight={"600"}>
                  Iniciar Sesión
                </Typography>
              </Col>
              <Col span={24}>
                <Form
                  form={form}
                  name="loginForm"
                  layout="vertical"
                  onFinish={onLogin}
                  requiredMark={false}
                  initialValues={{
                    cedula: '',
                    clave: ''
                  }}
                >

                  <Form.Item
                    hasFeedback
                    rules={[{ required: true }]}
                    required
                    label="Cédula"
                    name="cedula"
                  >
                    <Input
                      style={{ border: "0px 0px 1px 0px" }}
                      size="large"
                      type="text"
                      autoFocus
                      prefix={<UserOutlined style={
                        {
                          marginRight: '8px',
                          ...inputIconProps.style
                        }}
                      />}
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    rules={[{ required: true }]}
                    required
                    name="clave"
                    label="Contraseña"
                    style={{ margin: 0 }}
                  >
                    <InputClave
                      size="large"
                      iconRender={claveIconRender}
                      prefix={<LockOutlined style={
                        {
                          marginRight: '8px',
                          ...inputIconProps.style
                        }}
                      />}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: '5px' }}>
                    <Button
                      loading={isLoginLoading}
                      type="primary"
                      size="large"
                      style={{
                        maxWidth: '300px',
                        marginTop: '20px',
                        width: '100%',
                        fontWeight: '600',
                        borderRadius: '22px'
                      }}
                      htmlType="submit"
                    >
                      Ingresar
                    </Button>
                  </Form.Item>
                </Form>

              </Col>
            </Row>

          </Card>

        </div>
      </div>);

    </>
  )
}


























// function Login() {
//   return (
// <div style={{ height: "100%", display: "flex", alignItems: 'center', alingContent: 'center' }}>
//   <div style={{ width:"100%", display: "1 1 auto"}}>


//     </div>
// </div>);
// };

export default Login;