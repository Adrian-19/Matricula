import React, { useEffect, useRef, useState, useContext } from 'react';
import { Table, Input, Popconfirm, Form, Typography, notification, Row, Col, Button, Modal, Select, DatePicker, Drawer } from 'antd';
import { PlusOutlined } from "@ant-design/icons"
import alumnosAPI from 'services/alumnosAPI';
import moment from 'moment'
import carrerasAPI from 'services/carrerasAPI';
import "moment/locale/es";
import { AutenticacionContext } from "context/AutenticacionContext"
import HistorialAlumno from 'components/HistorialAlumno';
import ciclosAPI from 'services/ciclosAPI';
import cursosAPI from 'services/cursosAPI';
import matriculasAPI from 'services/matriculasAPI';
moment.locale("es");

const { Option } = Select

const openErrorNotification = (message, description) => {
  notification.error({
    message: `${message}`,
    description: `${description}`,
    placement: "bottomRight"

  });
};

const openSuccessNotification = (message, description) => {
  notification.success({
    message: `${message}`,
    description: `${description}`,
    placement: "bottomRight"

  });
};





function MantenimientoAlumnos() {
  const { userRole } = useContext(AutenticacionContext)
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const refDataBeforeFilter = useRef([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterOption, setFilterOption] = useState({ option: "cedula", placeholder: "Filtrar por cédula" });
  const [carreras, setCarreras] = useState([]);
  const [showModalHistorial, setShowModalHistorial] = useState(false);
  const [currentAlumno, setCurrentAlumno] = useState({});
  const [showModalCursosCicloActivo, setShowModalCursosCicloActivo] = useState(false)
  const [cursosAlumno, setCursosAlumno] = useState([])
  const [cicloActivo, setCicloActivo] = useState({})
  const [cursosGeneral, setCursosGeneral] = useState([]);
  //const []

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let disabled = dataIndex === "cedula" ? true : false;


    const getField = () => {
      if (inputType === 'select')
        return <Select defaultValue={`${record.carrera.id}`}>
          {carreras.map((carrera) => (
            <Option value={carrera.id}>
              {`${carrera.codigo} - ${carrera.nombre}`}
            </Option>
          ))}
        </Select>
      else if (inputType === 'picker')
        return <DatePicker format={"DD-MM-YYYY"} />
      else
        return <Input disabled={disabled} />
    }

    const inputNode = getField()
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Por favor ingresar ${title.toLowerCase()}`,
              },
            ]}

          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const showModal = () => {
    setIsModalVisible(true);

  };

  const openModalHistorial = () => {
    setShowModalHistorial(true);
  };

  const closeModalHistorial = () => {
    setShowModalHistorial(false);
  }

  const openModalCursos = () => {
    setShowModalCursosCicloActivo(true);
  };

  const closeModalCursos = () => {
    setShowModalCursosCicloActivo(false);
  }



  const handleOk = async () => {
    try {
      const alumno = await form.validateFields()
      alumno.fechaNacimiento = alumno.fechaNacimiento.format("YYYY-MM-DD")
      alumno.carreraId = alumno.carrera
      alumnosAPI().addAlumno({ ...alumno })
        .then((alumno) => {
          setData(prev => [...prev, { ...alumno, key: alumno.id }])
          openSuccessNotification("Éxito al agregar", `El alumno ${alumno.nombre} con cédula ${alumno.cedula} ha sido agregado correctamente`);
        })
        .catch(errorStatus => {
          if (errorStatus === 406) {
            openErrorNotification("Error al agregar", `La cédula ${alumno.cedula} ya existe`)
          } else {
            openErrorNotification("Error al agregar", `No se pudo agregar al alumno`)
          }
        })
      setIsModalVisible(false);
    } catch (e) { }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ cedula: "", nombre: "", email: "", telefono: "" })
  };

  useEffect(() => {
    alumnosAPI().buscarAlumnos()
      .then(alumnos => {
        const alumnosData = alumnos.map(alumno => ({ ...alumno, fechaNacimiento: moment(alumno.fechaNacimiento.replace("Z", ""), "YYYY-MM-DD"), key: alumno.id }));
        refDataBeforeFilter.current = alumnosData;
        setData(alumnosData)
      })
      .catch((error) => { });
    carrerasAPI().getAll()
      .then(newCarreras => {
        newCarreras.forEach(element => element.key = element.id);
        setCarreras(newCarreras);
      })
      .catch((error) => { });
    ciclosAPI().getAll()
      .then(ciclos => {
        const cicloA = ciclos.find(ciclo => ciclo.activo === 1)
        setCicloActivo(cicloA)
      })
      .catch((error) => { });
    cursosAPI().getAll()
      .then(cursos => {
        setCursosGeneral(cursos)
      })
      .catch((error) => { });

  }, []) //eslint-disable-line

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');

  };



  const save = async (record) => {
    try {
      let nuevoAlumno = await form.validateFields();
      const nuevaCarrera = carreras.find(carrera => nuevoAlumno.carreraId === carrera.id)
      nuevoAlumno.fechaNacimiento = nuevoAlumno.fechaNacimiento.format("YYYY-MM-DD");
      nuevoAlumno.carrera = nuevaCarrera;
      const newData = [...data];
      const indexAlumnoAnt = newData.findIndex((item) => record.key === item.key);
      if (indexAlumnoAnt > -1) {
        const alumnoAnt = newData[indexAlumnoAnt];
        newData.splice(indexAlumnoAnt, 1, { ...alumnoAnt, ...nuevoAlumno });
        const alumnoActualizado = newData[indexAlumnoAnt];
        alumnosAPI().modificarAlumno(alumnoActualizado)
          .then(res => {
            if (res.ok) {
              setData(newData)
              refDataBeforeFilter.current = newData;
              setEditingKey('');
              openSuccessNotification("Éxito al actualizar", "");

            } else {
              openErrorNotification("Error al actualizar", `No se pudo actualizar los datos de ${alumnoAnt.nombre}`)
            }
          });
      } else {
        newData.push(nuevoAlumno);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      openErrorNotification("Error al actualizar", `No se pudo actualizar los datos`)
    }
  };

  const handleDeleteRow = alumno => {
    console.log(alumno)
    alumnosAPI().eliminarAlumno({ id: alumno.id })
      .then(res => {
        if (res.ok) {
          setData(data.filter((row) => row.id !== alumno.id))
          openSuccessNotification("Éxito al eliminar", `${alumno.nombre} con cédula ${alumno.cedula} ha sido eliminado correctamente`);
        } else {
          openErrorNotification("Error al eliminar", `${alumno.nombre} tiene grupos matriculados`)
        }
      })
  };

  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      editable: true,
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
    }, {
      title: 'Teléfono',
      dataIndex: 'telefono',
      editable: true,
    }, {
      title: 'Fecha de nacimiento',
      dataIndex: 'fechaNacimiento',
      editable: true,
      render: (text, alumno) => {
        return moment(text, "YYYY-MM-DD").format("LL")
      }
    }, {
      title: 'Carrera',
      dataIndex: 'carreraId',
      editable: true,
      render: (_, alumno) => {
        return `${alumno.carrera.codigo} - ${alumno.carrera.nombre} `
      }
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record)} style={{ marginRight: 8 }}>
              Guardar
            </Typography.Link>
            <Popconfirm title="¿Está seguro de cancelar?" onConfirm={cancel}>
              <Typography.Link>
                Cancelar
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : <>
          {userRole === "Administrador" && <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
            Editar
          </Typography.Link>}
          {userRole === "Administrador" && <Typography.Link disabled={editingKey !== ''} onClick={() => console.log()} style={{ marginRight: 8 }}>
            Cursos
          </Typography.Link>}
          {userRole === "Administrador" && <Typography.Link disabled={editingKey !== ''} onClick={() => {
            setCurrentAlumno(record)
            setShowModalHistorial(true)
          }} style={{ marginRight: 8 }}>
            Historial
          </Typography.Link>}
          <Typography.Link disabled={editingKey !== ''} onClick={() => {
            alumnosAPI().cursosCicloActivo({ id: record.id })
              .then(cursos => {
                setCursosAlumno(cursos)
                setCurrentAlumno(record)
                openModalCursos()
              })
              .catch(e => { console.log(e) })

          }} style={{ marginRight: 8 }}>
            Matricula
          </Typography.Link>
          {userRole === "Administrador" && <Popconfirm title="¿Está seguro de eliminar al profesor?" onConfirm={() => handleDeleteRow(record)}>
            <Typography.Link disabled={editingKey !== ''} style={editingKey !== '' ? null : { color: "red" }}>
              Eliminar
            </Typography.Link>
          </Popconfirm>}
        </>;
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    const getField = () => {
      if (col.dataIndex === 'carreraId')
        return "select"
      else if (col.dataIndex === 'fechaNacimiento')
        return "picker"
      else
        return "text"
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: getField(),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const removeDiacritics = (text) => {
    return text.normalize('NFD')
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .normalize();
  }

  const filtrar = (value) => {
    if (Boolean(value)) {
      const dataFiltered = refDataBeforeFilter.current.filter(alumno => {
        const newValue = removeDiacritics(value).toLowerCase();
        if (filterOption.option === "cedula") {
          const cedula = removeDiacritics(alumno.cedula).toLowerCase();
          return cedula.includes(newValue);
        } else if (filterOption.option === "nombre") {
          const nombre = removeDiacritics(alumno.nombre).toLowerCase();
          return nombre.includes(newValue);
        } else if (filterOption.option === "carrera") {
          const carrera = removeDiacritics(alumno.carrera).toLowerCase();
          return carrera.includes(newValue);
        }
        return false;
      })
      if (Boolean(dataFiltered))
        setData(dataFiltered);
    } else {
      setData(refDataBeforeFilter.current);
    }
  }

  const changeFilterOption = (value) => {
    if (value === "cedula") {
      setFilterOption({ option: "cedula", placeholder: "Filtrar por cédula" })
    } else if (value === "nombre") {
      setFilterOption({ option: "nombre", placeholder: "Filtrar por nombre" })
    } else if (value === "carrera") {
      setFilterOption({ option: "carrera", placeholder: "Filtrar por carrera" })
    }
  }

  const columnsCursos = [
    {
      title: 'Código',
      dataIndex: 'codigo',
    }, {
      title: 'Nombre',
      dataIndex: 'nombre',
    }, {
      title: 'Créditos',
      dataIndex: 'creditos',
    }, {
      title: 'Horas semanales',
      dataIndex: 'horas_semanales',
    },

  ]

  const [showDrawer, setShowDrawer] = useState(false);

  const matricular = () => {
    const {numeroMatricula,matricularCurso } = form.getFieldsValue(["numeroMatricula", "matricularCurso"])
    if(Boolean(numeroMatricula) || Boolean(matricularCurso)) 
      return
    const matricula = {
      numero: numeroMatricula,
      
    }
    matriculasAPI().insertarMatricula({})
  }

  return <>
    {(userRole === "Administrador" || userRole === "Matriculador") && <Form form={form} component={false}>
      <Row>
        {userRole === "Administrador" && <Col span={24} style={{ background: "rgb(250,250,251)", height: "80px", border: "1px solid rgb(240,240,240)" }} height={100}>
          <Row justify="space-between" align="middle" style={{ height: "100%", padding: "20px" }}>
            <Col >
              <Input.Group compact>
                <Select style={{ width: '100px' }} defaultValue={filterOption.option} onChange={(value) => changeFilterOption(value)}>
                  <Option value="cedula">Cédula</Option>
                  <Option value="nombre">Nombre</Option>
                  <Option value="carrera">Carrera</Option>
                </Select>
                <Input
                  disabled={editingKey !== ''}
                  allowClear
                  placeholder={filterOption.placeholder}
                  style={{ width: "300px" }}
                  onChange={(evt) => filtrar(evt.target.value)}
                >
                </Input>
              </Input.Group>
            </Col>
            <Col >
              <Button disabled={editingKey !== ''} type="primary" onClick={showModal}> <PlusOutlined style={{ fontSize: "100%" }} />Añadir alumno</Button>
            </Col>
          </Row>
        </Col>}
        <Col span={24}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            size={"default"}
            bordered
            dataSource={data}
            columns={mergedColumns}
            loading={carreras.length === 0}
            pagination={data.length > 10 ? true : false}
          />
        </Col>
      </Row>
      <Modal
        title="Añadir alumno"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        destroyOnClose
        okText="Añadir"

      >
        <Form.Item name="cedula" rules={[{ required: true, message: "Por favor ingresar cédula" }]}>
          <Input placeholder="Digite la cédula"></Input>
        </Form.Item>
        <Form.Item name="nombre" rules={[{ required: true }]}>
          <Input placeholder="Digite el nombre" ></Input>
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Digite el email" ></Input>
        </Form.Item>
        <Form.Item name="telefono" rules={[{ required: true, message: "Por favor ingresar teléfono" }]}>
          <Input placeholder="Digite el teléfono" ></Input>
        </Form.Item>
        <Form.Item name="fechaNacimiento" rules={[{ required: true, message: "Por favor elegir fecha" }]}>
          <DatePicker format={"LL"} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="carrera" rules={[{ required: true, message: "Por favor elegir una carrera" }]}>
          <Select placeholder="Elegir carrera">
            {carreras.map((carrera) => (
              <Option value={carrera.id}>
                {`${carrera.codigo} - ${carrera.nombre}`}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Modal>


    </Form>}
    <Modal
      visible={showModalHistorial}
      onCancel={closeModalHistorial}
      width={900}
    >
      <HistorialAlumno id={currentAlumno.id} ></HistorialAlumno>

    </Modal>

    <Modal
      title="Cursos matriculados en el ciclo activo"
      className='cursos por ciclo activo'
      visible={showModalCursosCicloActivo}
      onCancel={closeModalCursos}
      width={900}
    >
      <div className='cursos alumno' style={{ width: '100%' }}>

        <Col style={{ display: 'flex', flexDirection: 'column', marginBottom: "15px" }}>
          <Button
            style={{ alignSelf: "flex-end" }}
            disabled={editingKey !== ''}
            type="primary"
            onClick={() => setShowDrawer(true)}> <PlusOutlined style={{ fontSize: "100%" }} />Matricular curso</Button>
        </Col>
        <Table
          columns={columnsCursos}
          dataSource={cursosAlumno}
          pagination={cursosAlumno.length > 10 ? true : false}
        >


        </Table>

      </div>

    </Modal>
    <Drawer title="Matricular" placement="right" onClose={() => setShowDrawer(false)} visible={showDrawer}>
      <Form.Item name="numeroMatricula" rules={[{ required: true }]}>
        <Input placeholder="Digite el número de matricula" ></Input>
      </Form.Item>
      <Form.Item name="matricularCurso" rules={[{ required: true }]}>
        <Select placeholder="Seleccionar un curso" >
          {cursosGeneral.map(curso => {
            return <Option value={curso.id} key={curso.id} >{curso.nombre}</Option>
          })}

        </Select>
      </Form.Item>
      <Col style={{ display: 'flex', flexDirection: 'column', marginBottom: "15px" }}>
      <Button
        style={{ alignSelf: "flex-end" }}
        disabled={editingKey !== ''}
        type="primary"
        onClick={matricular}> <PlusOutlined style={{ fontSize: "100%" }} />Matricular</Button>
    </Col>
    </Drawer>
    


  </>
};

export default MantenimientoAlumnos;