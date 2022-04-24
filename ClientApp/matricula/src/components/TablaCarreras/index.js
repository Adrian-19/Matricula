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
import { useNavigate } from "react-router-dom"

const TablaCarreras = ({ needsRefresh, setNeedsRefresh, idCarrera = null }) => {
  const navigate = useNavigate()
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
  }, [needsRefresh]);

  const onFinish = () => {
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
  };

  const filterData = () => {
    const data = dataSource;

    if (filterInput === "") return data;
    else if(!isNaN(filterInput)) return data;
    else{
      return data.filter(
        (element)=>
          element.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          element.codigo.toLowerCase().includes(filterInput.toLowerCase())
      )
    }
  };

  const onDelete = (id) => {
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
  };

  const columns = [
    {
      key: 1,
      title: "Nombre",
      dataIndex: "nombre",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="nombre"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre",
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
      title: "Código",
      dataIndex: "codigo",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="codigo"
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
      title: "Título",
      dataIndex: "titulo",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="titulo"
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
                    nombre: record.nombre,
                    codigo: record.codigo,
                    titulo: record.titulo,
                  });
                } else {
                  if(guardarMethod === 2){
                    setDataSource(
                      dataSource.filter((carrera)=>carrera.id!==editingRow)
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
            <Button type="link" onClick={()=>navigate(`/cursos/${record.id}`)}>Ver Cursos</Button>
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
        title={"Carrera"}
        setFilterInput={setFilterInput}
        dataSource={dataSource}
        setDataSource={setDataSource}
        form={form}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        setGuardarMethod={setGuardarMethod}
        placeholder={"Buscar por nombre o por código"}
        newObject={newCarrera}
        backButton={null}
      />
      <Form form={form}>
        <Table columns={columns} dataSource={filterData()}></Table>
      </Form>
    </Col>
  );
};

export default TablaCarreras;
