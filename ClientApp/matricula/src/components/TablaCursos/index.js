import { Button, Table, Form, Input } from "antd";
import { useEffect, useState } from "react";
import cursosAPI from "../../services/cursosAPI";

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

const TablaCursos = () => {
  const [dataSource, setDataSource] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("executing useEffect");
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    cursosAPI()
      .getAll()
      .then((newData) => {
        setDataSource(newData);
        console.log(newData);
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
        }));
      });
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      render: (text, record) => {
        if (editingRow === record.key) {
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
      dataIndex: "carrera.nombre",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="carrera"
              rules={[
                {
                  required: true,
                  message: "Ingrese la carrera",
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
      title: "Ciclo",
      dataIndex: "ciclo.annio",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="ciclo"
              rules={[
                {
                  required: true,
                  message: "Ingrese el ciclo",
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
      title: "Créditos",
      dataIndex: "creditos",
      render: (text, record) => {
        if (editingRow === record.key) {
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
        if (editingRow === record.key) {
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
                setEditingRow(record.key);
                form.setFieldsValue({
                  nombre: record.nombre,
                  carrera: record.carrera,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Table columns={columns} dataSource={dataSource}></Table>
    </Form>
  );
};

export default TablaCursos;
