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
import cursosAPI from "../../services/cursosAPI";
import carrerasAPI from "../../services/carrerasAPI";
import ciclosAPI from "../../services/ciclosAPI";
import TableHeader from "../TableHeader";

const { Option } = Select;

const TablaCursos = ({ needsRefresh, setNeedsRefresh, carreraId = null }) => {
  const backTo = "/carreras";
  const [dataSource, setDataSource] = useState([]);
  const [carrerasDataSource, setCarrerasDataSource] = useState([]);
  const [ciclosDataSource, setCiclosDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [guardarMethod, setGuardarMethod] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });

  const newCurso = {
    name: "",
    codigo: "",
    carrera: 1,
    ciclo: 1,
    creditos: "",
    horasSemanales: "",
  };

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("id: ", carreraId);
    if (carreraId === null) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      cursosAPI()
        .getAll()
        .then((newData) => {
          setDataSource(newData);
          carrerasAPI()
            .getAll()
            .then((newCarreras) => {
              newCarreras.forEach((element) => {
                element.key = element.id;
              });
              setCarrerasDataSource(newCarreras);
              ciclosAPI()
                .getAll()
                .then((newCiclos) => {
                  setCiclosDataSource(newCiclos);
                  setState((prev) => ({
                    ...prev,
                    isLoading: false,
                  }));
                });
            });
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isError: true,
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      cursosAPI()
        .getAllPorCarrera(carreraId)
        .then((newData) => {
          setDataSource(newData);
          carrerasAPI()
            .getAll()
            .then((newCarreras) => {
              newCarreras.forEach((element) => {
                element.key = element.id;
              });
              setCarrerasDataSource(newCarreras);
              ciclosAPI()
                .getAll()
                .then((newCiclos) => {
                  setCiclosDataSource(newCiclos);
                  setState((prev) => ({
                    ...prev,
                    isLoading: false,
                  }));
                });
            });
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isError: true,
          }));
        });
    }
  }, [needsRefresh]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (guardarMethod === 1) {
      form
        .validateFields([
          "nombre",
          "codigo",
          "carrera",
          "ciclo",
          "creditos",
          "horas_semanales",
        ])
        .then(() => {
          setState((prev) => ({
            ...prev,
            isLoading: true,
          }));
          cursosAPI()
            .updateCurso({
              id: editingRow,
              nombre: values.nombre,
              codigo: values.codigo,
              carreraId: values.carrera,
              cicloId: values.ciclo,
              creditos: values.creditos,
              horas_semanales: values.horas_semanales,
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
    } else if (guardarMethod === 2) {
      form
        .validateFields([
          "nombre",
          "codigo",
          "carrera",
          "ciclo",
          "creditos",
          "horas_semanales",
        ])
        .then(() => {
          cursosAPI()
            .insertarCurso({
              id: editingRow,
              nombre: values.nombre,
              codigo: values.codigo,
              carreraId: values.carrera,
              cicloId: values.ciclo,
              creditos: values.creditos,
              horas_semanales: values.horas_semanales,
            })
            .then(() => {
              notification.success({
                message: "Actualización exitosa.",
                description: "El dato se actualizó exitosamente.",
              });
              setEditingRow(null);
              setGuardarMethod(null);
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
            description: "Debe de ingresar todos los credenciales.",
          });
        });
    }
  };

  const filterData = () => {
    const data = dataSource;
    if (filterInput === "") return data;
    else if (!isNaN(filterInput))
      return data.filter((element) => element.codigo.includes(filterInput));
    return data.filter(
      (element) =>
        element.carrera.nombre
          .toLowerCase()
          .includes(filterInput.toLowerCase()) ||
        element.nombre.toLowerCase().includes(filterInput.toLowerCase())
    );
  };

  const onDelete = (id) => {
    cursosAPI()
      .removeCurso(id)
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
            "El curso todavía está asociado a uno o varios grupos. Por favor, remuévalos primero. ",
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
              rules={[
                {
                  required: true,
                  message: "Ingrese el nombre",
                },
              ]}
            >
              <Input value={record.id} />
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
      title: "Carrera",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="carrera">
              <Select>
                {carrerasDataSource.map((carrera) => (
                  <Option value={carrera.id}>
                    {`${carrera.codigo} - ${carrera.nombre}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        } else {
          return <p>{`${record.carrera.codigo} - ${record.carrera.nombre}`}</p>;
        }
      },
    },
    {
      key: 4,
      title: "Ciclo",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="ciclo">
              <Select>
                {ciclosDataSource.map((ciclo) => (
                  <Option value={ciclo.id}>
                    {`${ciclo.numero} - ${ciclo.annio}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        } else {
          return <p>{`${record.ciclo.numero} - ${record.ciclo.annio}`}</p>;
        }
      },
    },
    {
      key: 5,
      title: "Créditos",
      dataIndex: "creditos",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="creditos"
              rules={[
                {
                  required: true,
                  message: "Ingrese los créditos",
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
      key: 6,
      title: "Horas Semanales",
      dataIndex: "horas_semanales",
      width: "100",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="horas_semanales"
              rules={[
                {
                  required: true,
                  message: "Ingrese las horas semanales",
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
      title: "Acciones",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setEditingRow(record.id);
                setGuardarMethod(1);
                if (editingRow === null) {
                  form.setFieldsValue({
                    nombre: record.nombre,
                    carrera: record.carrera.id,
                    ciclo: record.ciclo.id,
                    creditos: record.creditos,
                    horas_semanales: record.horas_semanales,
                    codigo: record.codigo,
                  });
                } else {
                  if (guardarMethod === 2) {
                    setDataSource(
                      dataSource.filter((curso) => curso.id !== editingRow)
                    );
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
            <Button
              type="link"
              onClick={onFinish}
              hidden={
                editingRow === null
                  ? true
                  : editingRow === record.id
                  ? false
                  : true
              }
            >
              Guardar
            </Button>
            <Popconfirm
              title="¿Está seguro que desea borrar este curso?"
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
        title={"Curso"}
        setFilterInput={setFilterInput}
        dataSource={dataSource}
        setDataSource={setDataSource}
        form={form}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        setGuardarMethod={setGuardarMethod}
        newObject={newCurso}
        placeholder={"Buscar por código, nombre o carrera"}
        backButton={carreraId !== null ? backTo : null}
      />
      <Form form={form}>
        <Table
          columns={columns}
          dataSource={filterData()}
          loading={state.isLoading}
        ></Table>
      </Form>
    </Col>
  );
};

export default TablaCursos;
