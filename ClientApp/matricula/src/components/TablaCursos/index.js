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
import TableHeader from "../TableHeader";
import { useHistory } from "react-router-dom";
import planDeEstudioAPI from "services/planDeEstudioAPI";

const TablaCursos = ({
  needsRefresh,
  setNeedsRefresh,
  carreraId = null,
  cicloId = null,
}) => {
  const backTo = "/carreras";
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
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
    console.log("cicloId: ", cicloId)
    if (carreraId === null && cicloId === null) { /** Solo mostrar cursos (Mant de cursos) */
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      cursosAPI()
        .getAll()
        .then((newData) => {
          setDataSource(newData);
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
    } else { /** Mostrar cursos x carrera (Mant de carreras) y oferta académica.*/
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      planDeEstudioAPI()
      .getAllPorCarrera(carreraId)
        .then((newData) => {
          setDataSource(newData);
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
          "creditos",
          "horas_semanales",
        ])
        .then(() => {
          cursosAPI()
            .insertarCurso({
              id: editingRow,
              nombre: values.nombre,
              codigo: values.codigo,
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
    if(carreraId === null){
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
    } else{
      planDeEstudioAPI()
      .removePlan(id)
      .then(()=>{
        notification.success({
          message: "Actualización exitosa.",
          description: "El dato se eliminó exitosamente.",
        });
        if (needsRefresh === true) {
          setNeedsRefresh(false);
        } else {
          setNeedsRefresh(true);
        }
      }).catch((error) => {
        notification.error({
          message: "Eliminación incorrecta",
          description:
            "El curso todavía está asociado a uno o varios grupos. Por favor, remuévalos primero. ",
        });
      });
    }
    
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
          return <p>{carreraId!== null ? record.curso.nombre : text}</p>;
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
          return <p>{carreraId!== null ? record.curso.codigo : text}</p>;
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
          return <p>{carreraId!== null ? record.curso.creditos : text}</p>;
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
          return <p>{carreraId!== null ? record.curso.horas_semanales : text}</p>;
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
              hidden={carreraId !== null ? true : false}
              onClick={() => {
                setEditingRow(record.id);
                setGuardarMethod(1);
                if (editingRow === null) {
                  form.setFieldsValue({
                    nombre: carreraId!== null ? record.curso.nombre : record.nombre,
                    creditos: carreraId!== null ? record.curso.creditos : record.creditos,
                    horas_semanales: carreraId!== null ? record.curso.horas_semanales : record.horas_semanales,
                    codigo: carreraId!== null ? record.curso.codigo : record.codigo,
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
                carreraId !== null && cicloId !== null
                  ? true
                  : editingRow === null
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
              <Button
                danger
                type="link"
                hidden={carreraId !== null && cicloId !== null}
              >
                Borrar
              </Button>
            </Popconfirm>
            <Button
              type="link"
              onClick={() => history.push(`/grupos/${record.id}/${cicloId}`)}
              hidden={cicloId === null}
            >
              Ver Grupos
            </Button>
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
        newObject={carreraId !== null && cicloId!==null ? null : newCurso}
        placeholder={"Buscar por código, nombre o carrera"}
        backButton={carreraId !== null ? backTo : null}
        anadirCursoLista={dataSource}
        carreraId={carreraId}
        setNeedsRefresh={setNeedsRefresh}
        needsRefresh={needsRefresh}
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
