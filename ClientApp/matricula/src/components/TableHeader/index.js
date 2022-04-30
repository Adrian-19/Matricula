import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";
import ModalElegirCurso from "components/ModalElegirCurso";

const { Search } = Input;

// Guardar method:
// 1 => Update object
// 2 => Insert new Object

// Back button:
// Se debe especificar el nombre del path al que se quiere regresar
// Si el prop está nulo, no se muestra el botón.

const TableHeader = ({
  title,
  setFilterInput,
  dataSource,
  setDataSource,
  setEditingRow,
  form,
  editingRow,
  setGuardarMethod,
  newObject,
  placeholder,
  backButton,
  anadirCursoLista = null,
  carreraId = null,
  setNeedsRefresh = null,
  needsRefresh = null,
}) => {
  const history = useHistory();
  const [modalState, setModalState] = useState({ isVisible: false });

  const onAddObject = () => {
    if (anadirCursoLista !== null && carreraId !== null) {
      setModalState({isVisible:true})

    } else {
      if (editingRow !== null) {
        form.resetFields();
        setEditingRow(null);
      }
      const newID = Math.max.apply(
        Math,
        dataSource.map(function (o) {
          return o.id + 1;
        })
      );
      newObject.id = newID;
      setDataSource((prev) => {
        return [newObject, ...prev];
      });
      setEditingRow(newID);
      setGuardarMethod(2);
    }
  };

  return (
    <React.Fragment>
      <Col style={{ display: "flex", alignItems: "center" }}>
        {backButton !== null ? (
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => history.push(`${backButton}`)}
          />
        ) : (
          <></>
        )}
        <Search
          placeholder={placeholder}
          allowClear
          onSearch={setFilterInput}
          style={{ width: "55%", padding: "5px " }}
        />
        {newObject !== null ? (
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            onClick={onAddObject}
          >
            Añadir {title}
          </Button>
        ) : (
          <></>
        )}
        <ModalElegirCurso
          dataSource={anadirCursoLista}
          carrera={carreraId}
          setNeedsRefresh={setNeedsRefresh}
          needsRefresh={needsRefresh}
          state={modalState}
          setState={setModalState}
        />
      </Col>
    </React.Fragment>
  );
};

export default TableHeader;
