import {
    Button,
    Table,
    Form,
    Input,
    Select,
    notification,
    Popconfirm,
    Col,
  } from "antd";
  import { useEffect, useState } from "react";
  import carrerasAPI from "../../services/carrerasAPI";
  import TableHeader from "../TableHeader";
  
  const { Option } = Select;

  const TablaAdministradores = ({ needsRefresh, setNeedsRefresh, idCarrera = null }) => {
    const [dataSource, setDataSource] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    const [guardarMethod, setGuardarMethod] = useState(null);
    const [state, setState] = useState({
      isLoading: false,
      isError: false,
    });
    const [editingRow, setEditingRow] = useState(null);
  
    const newCarrera = {
      name: "",
      codigo: "",
      titulo: "",
    };
  
    const [form] = Form.useForm();
  
    useEffect(() => {
        /** 
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      carrerasAPI()
        .getAll()
        .then((newCarreras) => {
          newCarreras.forEach((element) => {
            element.key = element.id;
          });
          setDataSource(newCarreras);
        })
        .catch((error) => {});
        */
    }, [needsRefresh]);
  
    const onFinish = () => {
        /** 
      const values = form.getFieldsValue();
      console.log(values);
      if (guardarMethod === 1) {
        form
          .validateFields(["nombre", "codigo", "titulo"])
          .then(() => {
            setState((prev) => ({
              ...prev,
              isLoading: true,
            }));
            carrerasAPI()
              .updateCarrera({
                id: editingRow,
                nombre: values.nombre,
                codigo: values.codigo,
                titulo: values.titulo,
              })
              .then(() => {
                setState((prev) => ({
                  ...prev,
                  isLoading: false,
                }));
                notification.success({
                  message: "Actualización exitosa.",
                  description: "El dato se actualizó exitosamente.",
                });
                setEditingRow(null);
                setGuardarMethod(null);
                form.resetFields()
                if (needsRefresh === true) {
                  setNeedsRefresh(false);
                } else {
                  setNeedsRefresh(true);
                }
              })
              .catch((error) => {
                setState((prev) => ({
                  ...prev,
                  isLoading: false,
                  isError: true,
                }));
                setEditingRow(null);
                form.resetFields()
                notification.error({
                  message: "Un error ha ocurrido.",
                  description:
                    "El dato no fue actualizado. Por favor intente de nuevo.",
                });
              });
          })
          .catch((error) => {
            notification.error({
              message: "Datos inválidos",
              description:
                "El dato no fue actualizado. Por favor intente de nuevo.",
            });
          });
      }
      else if (guardarMethod === 2) {
          form
            .validateFields([
              "nombre",
              "codigo",
              "titulo",
            ])
            .then(() => {
              carrerasAPI()
                .insertarCarerra({
                  nombre: values.nombre,
                  codigo: values.codigo,
                  titulo: values.titulo,
                })
                .then(() => {
                  notification.success({
                    message: "Actualización exitosa.",
                    description: "El dato se actualizó exitosamente.",
                  });
                  setEditingRow(null);
                  setGuardarMethod(null);
                  form.resetFields()
                  if (needsRefresh === true) {
                    setNeedsRefresh(false);
                  } else {
                    setNeedsRefresh(true);
                  }
                })
                .catch((error) => {
                  setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    isError: true,
                  }));
                  setEditingRow(null);
                  form.resetFields()
                  notification.error({
                    message: "Un error ha ocurrido.",
                    description:
                      "El dato no fue actualizado. Por favor intente de nuevo.",
                  });
                });
            })
            .catch((error) => {
              setState((prev) => ({
                ...prev,
                isLoading: false,
                isError: true,
              }));
              notification.error({
                message: "Un error ha ocurrido.",
                description:
                  "Debe de ingresar todos los credenciales.",
              });
            });
        }
        */
    };
  
    const filterData = () => {
      const data = dataSource;
  
      if (filterInput === "") return data;
      /** 
      else if(!isNaN(filterInput)) return data;
      else{
        return data.filter(
          (element)=>
            element.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
            element.codigo.toLowerCase().includes(filterInput.toLowerCase())
        )
      }
      */
    };
  
    const onDelete = (id) => {
        /**
      carrerasAPI()
        .removeCarrera(id)
        .then(() => {
          notification.success({
            message: "Actualización exitosa.",
            description: "El dato se eliminó exitosamente.",
          });
          if (needsRefresh === true) {
            setNeedsRefresh(false);
          } else {
            setNeedsRefresh(true);
          }
        })
        .catch((error) => {
          notification.error({
            message: "Eliminación incorrecta",
            description:
              "La carrera todavía está asociada a estudiantes y/o cursos. Por favor, remuévalos primero. ",
          });
        });
         */
    };
  
    const columns = [
      {
        key: 1,
        title: "Cedula",
        dataIndex: "cedula",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="cedula"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Ingrese la cedula",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        key: 2,
        title: "Clave",
        dataIndex: "clave",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="clave"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                required
              >
                <Input />
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        key: 3,
        title: "Rol",
        dataIndex: "rol",
        render: (text, record) => {
          if (editingRow === record.id) {
            return (
              <Form.Item
                name="rol"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                required
              >
                <Select>
                    <Option value={1}></Option>
                </Select>
              </Form.Item>
            );
          } else {
            return <p>{text}</p>;
          }
        },
      },
      {
        title: "Acciones",
        render: (_, record) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => {
                  if (editingRow === null) {
                    setEditingRow(record.id);
                    setGuardarMethod(1);
                    form.setFieldsValue({
                      cedula: record.cedula,
                      clave: record.clave,
                      rol: record.rol,
                    });
                  } else {
                    if(guardarMethod === 2){
                      setDataSource(
                        dataSource.filter((usuario)=>usuario.id!==editingRow)
                      )
                    }
                    form.resetFields();
                    setEditingRow(null);
                  }
                }}
              >
                {editingRow === null
                  ? "Editar"
                  : editingRow === record.id
                  ? "Cancelar"
                  : "Editar"}
              </Button>
              <Button type="link" onClick={onFinish} hidden={editingRow === null ? true : (editingRow === record.id ? false : true) }>
                Guardar
              </Button>
              <Popconfirm
                title="¿Está seguro que desea borrar esta carrera?"
                onConfirm={() => onDelete(record.id)}
                okText="Sí"
                cancelText="No"
              >
                <Button danger type="link">
                  Borrar
                </Button>
              </Popconfirm>
            </>
          );
        },
      },
    ];
  
    return (
      <Col span="24" style={{ minHeight: "470px", height: "100%" }}>
        <TableHeader
          title={"Usuario"}
          setFilterInput={setFilterInput}
          dataSource={dataSource}
          setDataSource={setDataSource}
          form={form}
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          setGuardarMethod={setGuardarMethod}
          placeholder={"Buscar por cedula o por rol"}
          newObject={newCarrera}
          backButton={null}
        />
        <Form form={form}>
          <Table columns={columns} dataSource={filterData()}></Table>
        </Form>
      </Col>
    );
  };
  
  export default TablaAdministradores;
  