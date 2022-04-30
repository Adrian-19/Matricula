/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
import LogicaNegocio.Ciclo;
import LogicaNegocio.Curso;
import LogicaNegocio.Grupo;
import LogicaNegocio.PlanDeEstudio;
import LogicaNegocio.Profesor;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author XPC
 */
public class ServicioPlanDeEstudio extends Servicio {
    private static final String listarPlanDeEstudioCarrera = "{?=call listar_planDeEstudio_carrera(?)}";
    private static final String eliminarPlanDeEstudio = "{call eliminar_planDeEstudio(?)}";
    private static final String insertarPlanDeEstudio = "{call insertar_planDeEstudio (?,?)}";
    
    public Collection listarPlanDeEstudioCarrera(String id) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Curso curso = null;
        PlanDeEstudio planDeEstudio = null;
        Carrera carrera = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarPlanDeEstudioCarrera);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                
                carrera = new Carrera(rs.getString("carreraId"),rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                curso = new Curso(rs.getString("cursoId"),rs.getString("codigoCurso"), rs.getString("cursoNombre"),
                rs.getString("cursoCreditos"), rs.getString("cursoHorasSemanales"));
                planDeEstudio = new PlanDeEstudio(rs.getString("id"),rs.getString("carreraId"),rs.getString("cursoId"),
                    carrera,curso);
                coleccion.add(planDeEstudio);
            }
        } catch (SQLException e) {
            e.printStackTrace();

            throw new GlobalException("Sentencia no valida");
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (pstmt != null) {
                    pstmt.close();
                }
                desconectar();
            } catch (SQLException e) {
                throw new GlobalException("Estatutos invalidos o nulos");
            }
        }
        return coleccion;
    }
    
    public void insertarPlan(PlanDeEstudio planDeEstudio) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        CallableStatement pstmt = null;

        try {

            pstmt = conexion.prepareCall(insertarPlanDeEstudio);
            pstmt.setString(1, planDeEstudio.getCarreraId());
            pstmt.setString(2, planDeEstudio.getCursoId());

            boolean resultado = pstmt.execute();
            if (resultado == true) {
                throw new NoDataException("No se realizo la inserción");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            throw new GlobalException("Llave duplicada");
        } finally {
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
                desconectar();
            } catch (SQLException e) {
                throw new GlobalException("Estatutos invalidos o nulos");
            }
        }
    }
    
    public void eliminarPlanDeEstudio(String id) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(eliminarPlanDeEstudio);
            pstmt.setString(1, id);

            int resultado = pstmt.executeUpdate();

            if (resultado == 0) {
                throw new NoDataException("No se realizo el borrado");
            } else {
                System.out.println("\nEliminación Satisfactoria!");
            }
        } catch (SQLException e) {
            throw new GlobalException("Sentencia no valida");
        } finally {
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
                desconectar();
            } catch (SQLException e) {
                throw new GlobalException("Estatutos invalidos o nulos");
            }
        }
    }
}
