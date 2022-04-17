/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
import LogicaNegocio.Ciclo;
import LogicaNegocio.Curso;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author XPC
 */
public class ServicioCurso extends Servicio{
    private static final String insertarCurso = "{call insertar_curso (?,?,?,?,?,?)}";
    private static final String listarCurso = "{?=call listar_curso()}";
    private static final String buscarCurso = "{?=call buscar_curso(?)}";
    private static final String modificarCurso = "{call modificar_curso (?,?,?,?,?,?,?)}";
    private static final String eliminarCurso = "{call eliminar_curso(?)}";
    
    public Collection listarCurso() throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Curso curso = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarCurso);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                Carrera carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                Ciclo ciclo = new Ciclo(rs.getString("cicloId"),rs.getString("cicloAnnio"), rs.getString("cicloNumero"),
                    rs.getDate("cicloFechaInicio"),rs.getDate("cicloFechaFinal"),rs.getInt("cicloActivo"));
                curso = new Curso(rs.getString("id"), rs.getString("codigo"), rs.getString("carreraId"), 
                    rs.getString("cicloId"), rs.getString("nombre"), rs.getString("creditos"), rs.getString("horasSemanales"), 
                        carrera, ciclo);
                coleccion.add(curso);
            }
        } catch (SQLException e) {
            e.printStackTrace();

            throw new GlobalException("Sentencia no valida");
        }
        try {
            rs.close();
            pstmt.close();
            desconectar();
        } catch (SQLException e) {
            throw new GlobalException("Estatutos invalidos o nulos");
        }
        return coleccion;
    }
}
