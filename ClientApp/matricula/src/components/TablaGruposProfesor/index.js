import { Button, Table, Form, notification, Col } from "antd";
import { useEffect, useState } from "react";
import carrerasAPI from "../../services/carrerasAPI";
import TableHeader from "../TableHeader";
import { useHistory } from "react-router-dom";
import gruposAPI from "services/gruposAPI";

const TablaGruposProfesor = ({
  needsRefresh,
  setNeedsRefresh,
  idProfesor = null,
}) => {
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
  });

  const newCarrera = {
    name: "",
    codigo: "",
    titulo: "",
  };

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    gruposAPI()
      .getAllByProfesor(idProfesor)
      .then((newGrupos) => {
          console.log(newGrupos);
        setDataSource(newGrupos);
      })
      .catch((error) => {});
  }, [needsRefresh]);

  const filterData = () => {
    const data = dataSource;

    if (filterInput === "") return data;
    else if (!isNaN(filterInput)) return data;
    else {
      return data.filter(
        (element) =>
          element.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          element.codigo.toLowerCase().includes(filterInput.toLowerCase())
      );
    }
  };

  const columns = [
    {
      title: "Número Grupo",
      dataIndex: "numeroGrupo",
    },
    {
      title: "Curso",
      render: (text, record) => {
        return `${record.curso.codigo}- ${record.curso.nombre}`
      },
    },
    {
      title: "Ciclo",
      render: (text, record) => {
        return `${record.ciclo.numero}- ${record.ciclo.annio}`
      },
    },
    {
      title: "Horario",
      dataIndex: "horario",
    },
    {
      title: "Acciones",
      render: (_, record) => {
        return (
          <>
            <Button type="link"  onClick={()=>history.push(`/misGrupos/${record.id}`)}>
              Registrar Notas
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Col span="24" style={{ minHeight: "470px", height: "100%" }}>
      <Table columns={columns} dataSource={filterData()}></Table>
    </Col>
  );
};

export default TablaGruposProfesor;
