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
import usuariosAPI from "services/usuariosAPI";
import carrerasAPI from "../../services/carrerasAPI";
import TableHeader from "../TableHeader";

const { Option } = Select;

const TablaAdministradores = ({
  needsRefresh,
  setNeedsRefresh,
  idCarrera = null,
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [guardarMethod, setGuardarMethod] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });
  const [editingRow, setEditingRow] = useState(null);

  const newUsuario = {
    cedula: "",
    clave: "",
    rol: "Admin",
  };

  const [form] = Form.useForm();

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    usuariosAPI()
      .getAllAdmins()
      .then((newUsuarios) => {
        setDataSource(newUsuarios);
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      })
      .catch((error) => {});
  }, [needsRefresh]);

  const onFinishUpdate = () => {
    const values = form.getFieldsValue();
    console.log(values);
    usuariosAPI()
      .updateUsuario({
        id: editingRow,
        cedula: values.cedula,
        clave: values.clave,
        rol: values.rol === "Admin" ? "1" : "2",
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
  };

  const onFinishPost = () => {
    const values = form.getFieldsValue();
    console.log(values)
    usuariosAPI()
      .insertarUsuario({
        cedula: values.cedula,
        clave: values.clave,
        rol: values.rol === "Admin" ? "1" : "2",
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
  };

  const onFinish = () => {
    form
      .validateFields(["cedula", "clave", "rol"])
      .then(() => {
        if (guardarMethod === 1) {
          onFinishUpdate();
        } else {
          onFinishPost()
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

  const filterData = () => {
    const data = dataSource;

    if (filterInput === "") return data;
    else if(isNaN(filterInput)) return data;
    else if (!isNaN(filterInput)) return data.filter((element)=>element.cedula.includes(filterInput))
  };

  const onDelete = (id) => {
    usuariosAPI()
      .removeUsuario(id)
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
                  message: "Ingrese la clave",
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
                  message: "Elija un rol",
                },
              ]}
              required
            >
              <Select>
                <Option value="Admin">Administrador</Option>
                <Option value="Matriculador">Matriculador</Option>
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
                  if (guardarMethod === 2) {
                    setDataSource(
                      dataSource.filter((usuario) => usuario.id !== editingRow)
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
        newObject={newUsuario}
        backButton={null}
      />
      <Form form={form}>
        <Table columns={columns} dataSource={filterData()}></Table>
      </Form>
    </Col>
  );
};

export default TablaAdministradores;
