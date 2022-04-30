import { Button, Col, Form, Input, notification, Popconfirm, Select, Table } from "antd";
import TableHeader from "components/TableHeader";
import { useEffect, useState } from "react";
import gruposAPI from "services/gruposAPI";
import profesoresAPI from "services/profesoresAPI";

const { Option } = Select;

const TablaGrupos = ({cursoId = null, cicloId = null, needsRefresh, setNeedsRefresh}) => {
  const backTo = "/ofertaAcademica"
  const [dataSource, setDataSource] = useState([]);
  const [profesoresDataSource, setProfesoresDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [guardarMethod, setGuardarMethod] = useState(null);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });

  const newGrupo ={}

  const [editingRow, setEditingRow] = useState(null);

  const [form] = Form.useForm();

  const filterData = () => {
    const data = dataSource;
    if (filterInput === "") return data;
    else{
      return data.filter(
        (element)=> element.numeroGrupo.includes(filterInput)
      )
    }
  }

  const onFinishUpdate=()=>{
    const values = form.getFieldsValue();
    gruposAPI()
      .updateGrupo({
        id : editingRow,
        numeroGrupo : values.numeroGrupo, 
        cicloId : cicloId, 
        cursoId : cursoId, 
        profesorId : values.profesor, 
        horario : values.horario
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

  const onFinishPost = () =>{
    const values = form.getFieldsValue();
    gruposAPI()
      .insertarGrupo({
        numeroGrupo : values.numeroGrupo, 
        cicloId : cicloId, 
        cursoId : cursoId, 
        profesorId : values.profesor, 
        horario : values.horario
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

  const onFinish = () => {
    form
    .validateFields(["numeroGrupo", "profesor", "horario"])
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
          "El dato no fue actualizado. Por favor intente de nuevo con todos los credenciales completos.",
      });
    });
  }

  const onDelete=(id)=>{
    gruposAPI()
      .removeGrupo(id)
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
            "El grupo todavía está asociado a matrículas. Debe desligarlo antes de eliminarlo. ",
        });
      });
  }

  useEffect(()=>{
    console.log("curso: ", cursoId)
    console.log("ciclo: ", cicloId)
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    gruposAPI()
    .getAllByCurso(cursoId, cicloId) /** Se sustituye por listar_ofertaAcademica_ciclo (?) Se ocupa conocer la carrera y el ciclo  */
      .then((newData) => {
        setDataSource(newData);
        profesoresAPI()
          .getAll()
          .then((newProfesores) => {
            newProfesores.forEach((element) => {
              element.key = element.id;
            });
            setProfesoresDataSource(newProfesores);
          })
      })
  },[needsRefresh])

  const columns = [
    {
      key: 1,
      width: "15%",
      title: "Número de grupo",
      dataIndex: "numeroGrupo",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="numeroGrupo"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Digite un número de grupo",
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
      title: "Profesor",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="profesor"
              rules={[
                {
                  required: true,
                  message: "Seleccione un profesor",
                },
              ]}
            >
              <Select>
                {profesoresDataSource.map((profesor) => (
                  <Option value={profesor.id}>
                    {profesor.nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        } else {
          return <p>{typeof(record.profesor) === "undefined" || typeof(record.profesor.nombre) === "undefined" ? "" : record.profesor.nombre}</p>;
        }
      },
    },
    {
      key: 3,
      title: "Horario",
      dataIndex: "horario",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="horario"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Digite el horario",
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
      width: "20%",
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
                    numeroGrupo: record.numeroGrupo,
                    profesor: record.profesor.id,
                    horario: record.horario,
                  });
                } else {
                  if (guardarMethod === 2) {
                    setDataSource(
                      dataSource.filter((profesor) => profesor.id !== editingRow)
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
              <Button
                danger
                type="link"
              >
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
        title={"Grupo"}
        setFilterInput={setFilterInput}
        dataSource={dataSource}
        setDataSource={setDataSource}
        form={form}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        setGuardarMethod={setGuardarMethod}
        placeholder={"Buscar por número de grupo"}
        newObject={newGrupo}
        backButton={backTo}
      />
      <Form form={form}>
        <Table columns={columns} dataSource={filterData()}></Table>
      </Form>
    </Col>
  );
};

export default TablaGrupos;
