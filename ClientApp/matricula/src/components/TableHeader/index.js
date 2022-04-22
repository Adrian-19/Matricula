import React, { useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom"

const { Search } = Input;

// Guardar method:
// 1 => Update object
// 2 => Insert new Object

// Back button:
// Se debe especificar el nombre del path al que se quiere regresar
// Si el prop está nulo, no se muestra el botón.

const TableHeader = ({ title, setFilterInput, dataSource, setDataSource, setEditingRow, form, editingRow, setGuardarMethod, newObject, placeholder, backButton }) => {
    const navigate = useNavigate()
    const onAddObject=()=>{
      if(editingRow!==null){
        form.resetFields()
        setEditingRow(null)
      }
        const newID = Math.max.apply(Math, dataSource.map(function(o) { return (o.id) + 1; }))
        newObject.id = newID
        setDataSource((prev)=>{
            return[newObject, ...prev]
        })
        setEditingRow(newID)
        setGuardarMethod(2)
    }

  return (
    <React.Fragment>
      <Col style={{ display: "flex", alignItems: "center" }}>
      {backButton!==null ? <Button icon={<ArrowLeftOutlined /> } onClick={()=>navigate(`${backButton}`)}/> : <></> }
        <Search
          placeholder={placeholder}
          allowClear
          onSearch={setFilterInput}
          style={{ width: "55%", padding: "5px " }}
        />
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={onAddObject}
        >
          Añadir {title}
        </Button>
      </Col>
    </React.Fragment>
  );
};

export default TableHeader
