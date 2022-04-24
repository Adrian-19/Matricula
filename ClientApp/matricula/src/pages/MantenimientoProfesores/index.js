import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';

import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import profesoresAPI from 'services/profesoresAPI';


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
              message: `Please Input ${title}!`,
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

function MantenimientoProfesores() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    profesoresAPI().buscarProfesores()
      .then(profesores => setData(profesores.map(profesor => ({ ...profesor, key: profesor.id }))))
  }, [])

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
              setEditingKey('');
            } else {
              console.log("ERROR")
            }
          });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDeleteRow = id => {
    profesoresAPI().eliminarProfesor({id})
      .then(res => {
        if (res.ok) {
          console.log(res.json())
          //setData(data.filter((row) => row.id !== id))
        }else{
          console.log('ERROR AL ELIMINAR PROFESOR')
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => handleDeleteRow(record.id)} style={{ color: "red" }}>
            Eliminar
          </Typography.Link>
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
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={data.length > 10 ? true : false}
      />
    </Form>
  );
};

export default MantenimientoProfesores;