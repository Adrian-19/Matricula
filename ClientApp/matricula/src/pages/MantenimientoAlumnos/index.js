import React, { useEffect, useRef, useState, } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, notification, Row, Col, Button, Modal } from 'antd';
import profesoresAPI from 'services/profesoresAPI';
import { PlusOutlined } from "@ant-design/icons"


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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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

function MantenimientoAlumnos() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const refDataBeforeFilter = useRef([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);

  };

  const handleOk = async () => {
    try {
      const profesor = await form.validateFields()
      profesoresAPI().addProfesor({ ...profesor })
        .then((profesor) => {
          setData(prev => [...prev, { ...profesor, key: profesor.id }])
          openSuccessNotification("Éxito al agregar",`El profesor ${profesor.nombre} con cédula ${profesor.cedula} ha sido agregado correctamente`);
        })
        .catch(errorStatus => {
          if (errorStatus === 406) {
            openErrorNotification("Error al agregar", `La cédula ${profesor.cedula} ya existe`)
          } else {
            openErrorNotification("Error al agregar", `No se pudo agregar al profesor`)
          }
        })
      setIsModalVisible(false);
    } catch (e) {}
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ cedula: "", nombre: "", email: "", telefono: "" })
  };

  useEffect(() => {
    profesoresAPI().buscarProfesores()
      .then(profesores => {
        const profesoresData = profesores.map(profesor => ({ ...profesor, key: profesor.id }));
        refDataBeforeFilter.current = profesoresData;
        setData(profesoresData)
      })
  }, []) //eslint-disable-line

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    console.log(record)
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');

  };



  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        let item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        item = newData[index];
        profesoresAPI().modificarProfesor(item)
          .then(res => {
            if (res.ok) {
              setData(newData)
              refDataBeforeFilter.current = newData;
              setEditingKey('');
              openSuccessNotification("Éxito al actualizar", "");

            } else {
              openErrorNotification("Error al actualizar", `No se pudo actualizar los datos de ${item.nombre}`)
            }
          });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      
    }
  };

  const handleDeleteRow = profesor => {
    profesoresAPI().eliminarProfesor({ id: profesor.id })
      .then(res => {
        if (res.ok) {
          setData(data.filter((row) => row.id !== profesor.id))
          openSuccessNotification("Éxito al eliminar", `${profesor.nombre} con cédula ${profesor.cedula} ha sido eliminado correctamente`);
        } else {
          openErrorNotification("Error al eliminar", `${profesor.nombre} tiene grupos asignados`)
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
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Guardar
            </Typography.Link>
            <Popconfirm title="¿Está seguro de cancelar?" onConfirm={cancel}>
              <Typography.Link>
                Cancelar
              </Typography.Link>
            </Popconfirm>
          </span>
        ) : <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
            Editar
          </Typography.Link>
          <Popconfirm title="¿Está seguro de eliminar al profesor?" onConfirm={() => handleDeleteRow(record)}>
            <Typography.Link disabled={editingKey !== ''} style={{ color: "red" }}>
              Eliminar
            </Typography.Link>
          </Popconfirm>
        </>;
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
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
      const dataFiltered = refDataBeforeFilter.current.filter(profesor => {
        const nombre = removeDiacritics(profesor.nombre).toLowerCase();
        const newValue = removeDiacritics(value).toLowerCase();
        return nombre.includes(newValue) || profesor.cedula.includes(value);
      })
      console.log(dataFiltered)
      setData(dataFiltered);
    } else {
      setData(refDataBeforeFilter.current);
    }
  }


  return (
    <Form form={form} component={false}>
      <Row>
        <Col span={24} style={{ background: "rgb(250,250,251)", height: "80px", border: "1px solid rgb(240,240,240)" }} height={100}>
          <Row justify="space-between" align="middle" style={{ height: "100%", padding: "20px" }}>
            <Col >
              <Input
                disabled={editingKey !== ''}
                allowClear
                placeholder="Filtrar por nombre o cédula"
                style={{ width: "400px" }}
                onChange={(evt) => filtrar(evt.target.value)}
              >
              </Input>
            </Col>
            <Col >
              <Button disabled={editingKey !== ''} type="primary" onClick={showModal}> <PlusOutlined style={{ fontSize: "100%" }} />Añadir profesor</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            pagination={data.length > 10 ? true : false}
          />
        </Col>
      </Row>
      <Modal
        title="Añadir profesor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        destroyOnClose
        okText="Añadir"

      >
        <Form.Item name="cedula" rules={[{ required: true , message: "Por favor ingresar cédula"}]}>
          <Input placeholder="Digite la cédula"></Input>
        </Form.Item>
        <Form.Item name="nombre" rules={[{ required: true }]}>
          <Input placeholder="Digite el nombre" ></Input>
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }]}>
          <Input placeholder="Digite el email" ></Input>
        </Form.Item>
        <Form.Item name="telefono" rules={[{ required: true,message: "Por favor ingresar teléfono" }]}>
          <Input placeholder="Digite el teléfono" ></Input>
        </Form.Item>
      </Modal>


    </Form>
  );
};

export default MantenimientoAlumnos;