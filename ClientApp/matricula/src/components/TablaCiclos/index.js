import {
  Button,
  Table,
  Form,
  Typography,
  DatePicker,
  notification,
  Popconfirm,
  Col,
  Radio,
  Select,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import ciclosAPI from "../../services/ciclosAPI";
import TableHeader from "../TableHeader";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const { Option } = Select;
const { Text } = Typography;

const TablaCiclos = ({ needsRefresh, setNeedsRefresh }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [guardarMethod, setGuardarMethod] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });
  const [editingRow, setEditingRow] = useState(null);

  const newCiclo = {
    annio: "",
    numero: "",
    activo: 0,
  };

  const [form] = Form.useForm();

  const hasChanged = (id, activo) => {
    for (var i = 0; i < dataSource.length; i++) {
      if (dataSource[i].id === id) {
        if (dataSource[i].activo !== activo) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const getCicloActivo = () => {
    for (var i = 0; i < dataSource.length; i++) {
      if (dataSource[i].activo === 1) {
        return dataSource[i];
      }
    }
    return null;
  };

  const onFinishPost = () => {
    const values = form.getFieldsValue();
    if (values.activo === 1) {
      const activeCiclo = getCicloActivo();
      ciclosAPI()
        .updateCiclos({
          id: activeCiclo.id,
          annio: activeCiclo.annio,
          numero: activeCiclo.numero,
          fechaInicio: activeCiclo.fechaInicio,
          fechaFinal: activeCiclo.fechaFinal,
          activo: 0,
        })
        .then(() => {
          ciclosAPI()
            .insertarCiclo({
              annio: values.fechaInicio.format("YYYY"),
              numero: values.numero,
              fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
              fechaFinal: values.fechaFinal.format("YYYY-MM-DD"),
              activo: values.activo,
            })
            .then(() => {
              notification.success({
                message: "Actualización exitosa.",
                description: "El dato se actualizó exitosamente.",
              });
              setEditingRow(null);
              setGuardarMethod(null);
              form.resetFields();
              if (needsRefresh === true) {
                setNeedsRefresh(false);
              } else {
                setNeedsRefresh(true);
              }
            });
        })
        .catch((error) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isError: true,
          }));
          setEditingRow(null);
          form.resetFields();
          notification.error({
            message: "Un error ha ocurrido.",
            description:
              "El dato no fue actualizado. Por favor intente de nuevo.",
          });
        });
    } else {
      ciclosAPI()
        .insertarCiclo({
          annio: values.fechaInicio.format("YYYY"),
          numero: values.numero,
          fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
          fechaFinal: values.fechaFinal.format("YYYY-MM-DD"),
          activo: values.activo,
        })
        .then(() => {
          notification.success({
            message: "Actualización exitosa.",
            description: "El dato se actualizó exitosamente.",
          });
          setEditingRow(null);
          setGuardarMethod(null);
          form.resetFields();
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
          form.resetFields();
          notification.error({
            message: "Un error ha ocurrido.",
            description:
              "El dato no fue actualizado. Por favor intente de nuevo.",
          });
        });
    }
  };

  const onFinishUpdate = () => {
    const values = form.getFieldsValue();
    form
      .validateFields(["activo", "numero"])
      .then(() => {
        setState((prev) => ({
          ...prev,
          isLoading: true,
        }));
        if (hasChanged(editingRow, values.activo) === true) {
          const activeCiclo = getCicloActivo();
          ciclosAPI()
            .updateCiclos({
              id: activeCiclo.id,
              annio: activeCiclo.annio,
              numero: activeCiclo.numero,
              fechaInicio: activeCiclo.fechaInicio,
              fechaFinal: activeCiclo.fechaFinal,
              activo: 0,
            })
            .then(() => {
              ciclosAPI()
                .updateCiclos({
                  id: editingRow,
                  annio: values.fechaInicio.format("YYYY"),
                  numero: values.numero,
                  fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
                  fechaFinal: values.fechaFinal.format("YYYY-MM-DD"),
                  activo: values.activo,
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
                  form.resetFields();
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
                  form.resetFields();
                  notification.error({
                    message: "Un error ha ocurrido.",
                    description:
                      "El dato no fue actualizado. Por favor intente de nuevo.",
                  });
                });
            });
        } else {
          ciclosAPI()
            .updateCiclos({
              id: editingRow,
              annio: values.fechaInicio.format("YYYY"),
              numero: values.numero,
              fechaInicio: values.fechaInicio.format("YYYY-MM-DD"),
              fechaFinal: values.fechaFinal.format("YYYY-MM-DD"),
              activo: values.activo,
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
              form.resetFields();
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
              form.resetFields();
              notification.error({
                message: "Un error ha ocurrido.",
                description:
                  "El dato no fue actualizado. Por favor intente de nuevo.",
              });
            });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Datos inválidos",
          description:
            "El dato no fue actualizado. Por favor intente de nuevo.",
        });
      });
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    if (
      values.activo === undefined ||
      values.numero === undefined ||
      values.fechaInicio === undefined ||
      values.fechaFinal === undefined ||
      moment(values.fechaInicio).isBefore(values.fechaFinal) === false
    ) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isError: true,
      }));
      notification.error({
        message: "Un error ha ocurrido.",
        description: "Hay credenciales incorrectos.",
      });
    } else {
      if (guardarMethod === 1) {
        onFinishUpdate();
      } else if (guardarMethod === 2) {
        onFinishPost();
      }
    }
  };

  const filterData = () => {
    const data = dataSource;

    if (filterInput === "") return data;
    else if(isNaN(filterInput)) return data
    else{
      return data.filter(
        (element)=>
        element.annio.includes(filterInput)
      )
    }
  };

  const onDelete = (id) => {
    if (getCicloActivo().id === id) {
      notification.error({
        message: "Eliminación incorrecta",
        description: "No se permite eliminar un ciclo activo.",
      });
    } else {
      ciclosAPI()
        .removeCiclo(id)
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
              "El ciclo todavía está asociado a cursos. Por favor, remuévalos primero. ",
          });
        });
    }
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    ciclosAPI()
      .getAll()
      .then((newCiclos) => {
        newCiclos.forEach((element) => {
          element.key = element.id;
        });
        setDataSource(newCiclos);
      })
      .catch((error) => {});
  }, [needsRefresh]);

  const columns = [
    {
      key: 5,
      title: "Estado",
      dataIndex: "activo",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="activo"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Seleccione un estado",
                },
              ]}
              required
            >
              <Select disabled={record.activo === 1 ? true : false}>
                <Option value={1}> Activo </Option>
                <Option value={0}> Inactivo </Option>
              </Select>
            </Form.Item>
          );
        } else {
          return (
            <p>
              {record.activo === 1 ? (
                <Tag color="green">Activo</Tag>
              ) : (
                <Tag>Inactivo</Tag>
              )}
            </p>
          );
        }
      },
    },
    {
      key: 1,
      title: "Año",
      dataIndex: "annio",
      render: (text, record) => {
        if (editingRow === record.id) {
          if (guardarMethod === 1) {
            return <p>{text}</p>;
          }
          return <Text type="warning">Se elije en la fecha de inicio.</Text>;
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 2,
      title: "Número",
      dataIndex: "numero",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="numero"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Seleccione un número",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
              </Radio.Group>
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      key: 3,
      title: "Fecha Inicio",
      dataIndex: "fechaInicio",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="fechaInicio" hasFeedback>
              <DatePicker format={"DD-MM-YYYY"} />
            </Form.Item>
          );
        } else {
          return (
            <p>
              {record.fechaInicio !== undefined
                ? moment(record.fechaInicio.replace("Z", "")).format("LL")
                : ""}
            </p>
          );
        }
      },
    },
    {
      key: 4,
      title: "Fecha Final",
      dataIndex: "fechaFinal",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item name="fechaFinal" hasFeedback>
              <DatePicker format={"DD-MM-YYYY"} />
            </Form.Item>
          );
        } else {
          return (
            <p>
              {record.fechaFinal !== undefined
                ? moment(record.fechaFinal.replace("Z", "")).format("LL")
                : ""}
            </p>
          );
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
                    annio: record.annio,
                    numero: record.numero,
                    fechaInicio: moment(record.fechaInicio, "YYYY-MM-DD"),
                    fechaFinal: moment(record.fechaFinal, "YYYY-MM-DD"),
                    activo: record.activo,
                  });
                } else {
                  if (guardarMethod === 2) {
                    setDataSource(
                      dataSource.filter((ciclo) => ciclo.id !== editingRow)
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
              title="¿Está seguro que desea borrar este ciclo?"
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
        title={"Ciclo"}
        setFilterInput={setFilterInput}
        dataSource={dataSource}
        setDataSource={setDataSource}
        form={form}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        setGuardarMethod={setGuardarMethod}
        placeholder={"Buscar por año"}
        newObject={newCiclo}
        backButton={null}
      />
      <Form form={form}>
        <Table columns={columns} dataSource={filterData()}></Table>
      </Form>
    </Col>
  );
};

export default TablaCiclos;
