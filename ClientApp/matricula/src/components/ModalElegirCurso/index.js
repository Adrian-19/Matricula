import React, { useEffect, useState } from "react";
import { Button, Form, Modal, notification, Select } from "antd";
import cursosAPI from "services/cursosAPI";
import planDeEstudioAPI from "services/planDeEstudioAPI";

const { Option } = Select;

const ModalElegirCurso = ({
  carrera,
  dataSource,
  setNeedsRefresh,
  needsRefresh,
  state,
  setState,
}) => {
  const [form] = Form.useForm();
  const [cursos, setCursos] = useState([]);

  function filtrarCursos (curso)  {
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].curso.id === curso.id) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (state.isVisible) {
      cursosAPI()
        .getAll()
        .then((newData) => {
          setCursos(newData.filter(filtrarCursos));
        })
        .catch((error) => {
          notification.error({
            message: "Ha ocurrido un error",
            description: "Por favor, intente de nuevo",
          });
        });
    }
  }, [state]);

  const addCurso = () => {
    const values = form.getFieldsValue();
    form
      .validateFields(["curso"])
      .then(() => {
        planDeEstudioAPI()
          .insertarPlan({
            carreraId: carrera,
            cursoId: values.curso,
          })
          .then(() => {
            notification.success({
              message: "Actualización exitosa",
              description: "Se añadió el curso.",
            });
            setState({ isVisible: false });
            form.resetFields();
            if (needsRefresh === true) {
                setNeedsRefresh(false);
              } else {
                setNeedsRefresh(true);
              }
          })
          .catch((error) => {
            notification.error({
              message: "Error",
              description: "Por favor, intente de nuevo",
            });
          });
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: "Por favor, seleccione un curso",
        });
      });
  };

  const modalFooter = (
    <Button shape="round" type="primary" onClick={addCurso}>
      Añadir Curso
    </Button>
  );

  const modalProps = {
    title: "Añadir un Curso",
    visible: state.isVisible,
    onCancel: () => {
      setState({ isVisible: false });
      form.resetFields();
    },
    footer: modalFooter,
  };

  return (
    <Modal {...modalProps} destroyOnClose>
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="curso"
          rules={[{ required: true, message: "Seleccione un curso" }]}
        >
          <Select placeholder={"Elija un curso"}>
            {cursos.map((curso) => (
              <Option value={curso.id}>{curso.nombre}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalElegirCurso;
