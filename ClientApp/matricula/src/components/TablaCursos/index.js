import {
  Button,
  Table,
  Form,
  Input,
  Select,
  notification,
  InputNumber,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import cursosAPI from "../../services/cursosAPI";
import carrerasAPI from "../../services/carrerasAPI";
import ciclosAPI from "../../services/ciclosAPI";

const { Option } = Select;

const data = [
  {
    key: "1",
    carrera: "EIF",
    ciclo: "2020",
    nombre: "Ingeniería I",
    creditos: "4",
    horas_semanales: "8",
  },
  {
    key: "2",
    carrera: "EIF",
    ciclo: "2020",
    nombre: "Ingeniería I",
    creditos: "4",
    horas_semanales: "8",
  },
  {
    key: "3",
    carrera: "EIF",
    ciclo: "2020",
    nombre: "Ingeniería I",
    creditos: "4",
    horas_semanales: "8",
  },
  {
    key: "4",
    carrera: "EIF",
    ciclo: "2020",
    nombre: "Ingeniería I",
    creditos: "4",
    horas_semanales: "8",
  },
  {
    key: "5",
    carrera: "EIF",
    ciclo: "2020",
    nombre: "Ingeniería I",
    creditos: "4",
    horas_semanales: "8",
  },
];

const TablaCursos = ({ needsRefresh, setNeedsRefresh }) => {
  const [dataSource, setDataSource] = useState([]);
  const [carrerasDataSource, setCarrerasDataSource] = useState([]);
  const [ciclosDataSource, setCiclosDataSource] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });
  const [editingRow, setEditingRow] = useState(null);
  
  const [form] = Form.useForm();

  useEffect(() => {
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
  }, [needsRefresh]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    console.log(values);
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
  };

  const onDelete = (id) => {
    cursosAPI()
    .removeCurso(id)
    .then(()=>{
      console.log("changed row")
      notification.success({
        message: "Actualización exitosa.",
        description: "El dato se eliminó exitosamente.",
      });
      console.log("notif?")
      if (needsRefresh === true) {
        setNeedsRefresh(false);
      } else {
        setNeedsRefresh(true);
      }
      console.log("ending")
    })
    .catch((error) => {
      notification.error({
        message: "Datos inválidos",
        description:
          "Error",
      });
    });
  };

  const columns = [
    {
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
                form.setFieldsValue({
                  nombre: record.nombre,
                  carrera: record.carrera.id,
                  ciclo: record.ciclo.id,
                  creditos: record.creditos,
                  horas_semanales: record.horas_semanales,
                  codigo: record.codigo,
                });
              }}
            >
              Editar
            </Button>
            <Button type="link" onClick={onFinish}>
              Guardar
            </Button>
            <Popconfirm
              title="¿Está seguro que desea borrar este curso?"
              onConfirm={()=> onDelete(record.id)}
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
    <Form form={form}>
      <Table columns={columns} dataSource={dataSource}></Table>
    </Form>
  );
};

export default TablaCursos;
