/**
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
  import carrerasAPI from "../../services/carrerasAPI";
  import TableHeader from "../TableHeader";
  import { useNavigate } from "react-router-dom"
  
  const TablaCarreras = ({ needsRefresh, setNeedsRefresh, idCarrera = null }) => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    const [guardarMethod, setGuardarMethod] = useState(null);
    const [state, setState] = useState({
      isLoading: false,
      isError: false,
    });
    const [editingRow, setEditingRow] = useState(null);
  
    const newCarrera = {
      name: "",
      codigo: "",
      titulo: "",
    };
  
    const [form] = Form.useForm();
  
    useEffect(() => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      carrerasAPI()
        .getAll()
        .then((newCarreras) => {
          newCarreras.forEach((element) => {
            element.key = element.id;
          });
          setDataSource(newCarreras);
        })
        .catch((error) => {});
    }, [needsRefresh]);
  
    
  
    const filterData = () => {
      const data = dataSource;
  
      if (filterInput === "") return data;
      else if(!isNaN(filterInput)) return data;
      else{
        return data.filter(
          (element)=>
            element.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
            element.codigo.toLowerCase().includes(filterInput.toLowerCase())
        )
      }
    };
  
    const columns = [
        {
            title:'Número Grupo',
            dataIndex:'numeroGrupo',
        },
        {
            title:'Curso',
            dataIndex:'cursoNombre',
            render: (text, record) =>{
                return <p>  </p>
            }
        },
        {
            title:''
        }
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
                      nombre: record.nombre,
                      codigo: record.codigo,
                      titulo: record.titulo,
                    });
                  } else {
                    if(guardarMethod === 2){
                      setDataSource(
                        dataSource.filter((carrera)=>carrera.id!==editingRow)
                      )
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
              <Button type="link" onClick={onFinish} hidden={editingRow === null ? true : (editingRow === record.id ? false : true) }>
                Guardar
              </Button>
              <Button type="link" onClick={()=>navigate(`/cursos/${record.id}`)}>Ver Cursos</Button>
              <Popconfirm
                title="¿Está seguro que desea borrar esta carrera?"
                onConfirm={() => onDelete(record.id)}
                okText="Sí"
                cancelText="No"
              >
                <Button danger type="link">
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
        <Table columns={columns} dataSource={filterData()}></Table>
      </Col>
    );
  };
  
  export default TablaCarreras;
   */