import { Button, Table, Form, Input, notification, Col, Alert } from "antd";
import React, { useEffect, useState } from "react";
import gruposAPI from "services/gruposAPI";
import matriculasAPI from "services/matriculasAPI";
import TableHeader from "../TableHeader";

const TablaRegistrarNotas = ({
  needsRefresh,
  setNeedsRefresh,
  idProfesor,
  grupoId,
}) => {
  const backTo = "/misGrupos";
  const [dataSource, setDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [guardarMethod, setGuardarMethod] = useState(null);
  const [gruposProfesor, setGruposProfesor] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });
  const [editingRow, setEditingRow] = useState(null);


  const [form] = Form.useForm();

  const onFinish = () => {
    const values = form.getFieldsValue()

    form.validateFields(["nota"]).then(()=>{
      matriculasAPI().updateMatricula({
        id:editingRow,
        nota:values.nota
      })
      .then(()=>{
        notification.success({
          message: "Actualización exitosa.",
          description: "Se modificó la nota del estudiante de manera exitosa.",
        })
        setEditingRow(null);
        if (needsRefresh === true) {
          setNeedsRefresh(false);
        } else {
          setNeedsRefresh(true);
        }
      })
      .catch((error)=>{
        setEditingRow(null);
        notification.error({
          message: "Un error ha ocurrido.",
          description: "Por favor intente de nuevo.",
        })
      })
    })
    .catch((error)=>{
      notification.error({
        message: "Un error ha ocurrido.",
        description: "Debe de digitar una nota al estudiante.",
      })
    })
  };

  const filterData = () => {
    const data = dataSource;

    if (filterInput === "") return data;
    else if (isNaN(filterInput)) return data;
    else {
      return data.filter((element) => element.alumno.cedula.includes(filterInput));
    }
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    gruposAPI()
      .buscarGrupos(grupoId, idProfesor)
      .then((grupos) => {
        setGruposProfesor(grupos);
        if (grupos.length > 0) {
          matriculasAPI()
            .getAllByGrupo(grupoId)
            .then((newMatriculas) => {
              console.log(newMatriculas);
              setDataSource(newMatriculas);
            })
            .catch((error) => {});
        }
      })
      .catch((error) => {});
  }, [needsRefresh]);

  const columns = [
    {
      title: "Cédula",
      render: (text, record) => {
        return <p>{record.alumno.cedula}</p>
      },
    },
    {
      title: "Nombre",
      render: (text, record) => {
        return <p>{record.alumno.nombre}</p>
      },
    },
    {
      title: "Email",
      render: (text, record) => {
        return <p>{record.alumno.email}</p>
      },
    },
    {
      title: "Teléfono",
      render: (text, record) => {
        return <p>{record.alumno.telefono}</p>
      },
    },
    {
      title: "Nota",
      dataIndex: "nota",
      width: "15%",
      render: (text, record) => {
        if (editingRow === record.id) {
          return (
            <Form.Item
              name="nota"
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
                    nota: record.nota,
                  });
                } else {
                  if (guardarMethod === 2) {
                    setDataSource(
                      dataSource.filter(
                        (matricula) => matricula.id !== editingRow
                      )
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
          </>
        );
      },
    },
  ];

  return (
    <Col span="24" style={{ minHeight: "470px", height: "100%" }}>
      {gruposProfesor.length === 0 ? (
        <Alert message="No puede acceder a este grupo." type="error" />
      ) : (
        <React.Fragment>
          <TableHeader
            title={""}
            setFilterInput={setFilterInput}
            dataSource={dataSource}
            setDataSource={setDataSource}
            form={form}
            editingRow={editingRow}
            setEditingRow={setEditingRow}
            setGuardarMethod={setGuardarMethod}
            placeholder={"Buscar por cédula"}
            newObject={null}
            backButton={backTo}
          />
          <Form form={form}>
            <Table columns={columns} dataSource={filterData()}></Table>
          </Form>
        </React.Fragment>
      )}
    </Col>
  );
};

export default TablaRegistrarNotas;
