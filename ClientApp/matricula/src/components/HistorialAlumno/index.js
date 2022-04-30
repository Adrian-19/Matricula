import { AutenticacionContext } from "context/AutenticacionContext"
import { useContext, useEffect, useState } from "react"
import alumnosAPI from "services/alumnosAPI";
import moment from "moment"
import Typography from "components/Typography";
import { Divider, Table } from "antd";


const getCiclo = (ciclo) => {
  return ciclo === "1" ? "Primer Ciclo" : "Segundo Ciclo"
}

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    width: '25%',
  },
  {
    title: 'Materia',
    dataIndex: 'nombre',
    width: '25%',
  },
  {
    title: 'Nota',
    dataIndex: 'nota',
    width: '25%',
  }, {
    title: 'Observación',
    dataIndex: 'observacion',
    width: '25%',
    render: (text, curso) => {
      return curso.nota > 67.5 ? "Aprobado" : "Reprobado";
    }
  }

]


function HistorialAlumno({ id }) {
  const { user } = useContext(AutenticacionContext)
  const idAlumno = Boolean(id) ? id : user.id;
  const [historial, setHistorial] = useState([]);
  var groupArray = require('group-array');


  useEffect(() => {
    alumnosAPI().historial({ id: idAlumno })
      .then(historial => {
        const newHistorial = historial.map(hist => {
          return {
            ...hist,
            annio: hist.ciclo.annio,
            numeroCiclo: hist.ciclo.numero,
            ciclo: {
              ...hist.ciclo,
              fechaInicio: moment(hist.ciclo.fechaInicio, "YYYY-MM-DD").format("LL"),
              fechaFinal: moment(hist.ciclo.fechaFinal, "YYYY-MM-DD").format("LL"),
            },
            curso:{
              ...hist.curso,
              nota: hist.nota
            }
          }
        })
        setHistorial(groupArray(newHistorial, "annio", "numeroCiclo"));

      })
  }, [idAlumno, groupArray])

  //console.log("Group by: ", historial)

  return <>
    {Boolean(historial) ? <>
      <div className="historial">
        <Typography variant="h4">Historial académico de {user.usuario.nombre}</Typography>
        <Divider style={{ color: "white" }} />
        <div className="annios" style={{ padding: "20px" }}>
          {Object.keys(historial).map((annio, index, array) => {
            return <>
              <h1> Año {annio}</h1>
              {Object.keys(historial[annio]).map(ciclo => {
                const datos = historial[annio][ciclo].map(datos => datos.curso);
                return <>
                  <div className="ciclos" style={{ padding: "20px" }}>
                    <h3> {getCiclo(ciclo)} </h3>
                    <Table
                      style={{ padding: "20px"}}
                      bordered
                      columns={columns}
                      dataSource={datos}
                      pagination={datos.length > 10 ? true : false}
                    />
                  </div>

                </>
              })}


              {index < array.length - 1 && <Divider style={{ color: "white" }} />}
            </>
          })}

        </div>
      </div>

    </>
      : <h1>El estudiante no cuenta con cursos aprobados o reprobados</h1>}
  </>
}


export default HistorialAlumno