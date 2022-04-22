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
public class ServicioCurso extends Servicio{
    private static final String insertarCurso = "{call insertar_curso (?,?,?,?,?,?)}";
    private static final String listarCurso = "{?=call listar_curso()}";
    private static final String buscarCurso = "{?=call buscar_curso(?)}";
    private static final String modificarCurso = "{call modificar_curso (?,?,?,?,?,?,?)}";
    private static final String eliminarCurso = "{call eliminar_curso(?)}";
    private static final String listarCursoCarrera = "{?=call listar_curso_carrera(?)}";
    
     public void insertarCurso(Curso curso) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        CallableStatement pstmt = null;

        try {

            pstmt = conexion.prepareCall(insertarCurso);
            pstmt.setString(1, curso.getCodigo());
            pstmt.setString(2, curso.getCarreraId());
            pstmt.setString(3, curso.getCicloId());
            pstmt.setString(4, curso.getNombre());
            pstmt.setString(5, curso.getCreditos());
            pstmt.setString(6, curso.getHoras_semanales());

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
        Carrera carrera = null;
        Ciclo ciclo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarCurso);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                ciclo = new Ciclo(rs.getString("cicloId"),rs.getString("cicloAnnio"), rs.getString("cicloNumero"),
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
    
     public void modificarCurso(Curso curso) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(modificarCurso);
            pstmt.setString(1, curso.getId());
            pstmt.setString(2, curso.getCodigo());
            pstmt.setString(3, curso.getCarreraId());
            pstmt.setString(4, curso.getCicloId());
            pstmt.setString(5, curso.getNombre());
            pstmt.setString(6, curso.getCreditos());
            pstmt.setString(7, curso.getHoras_semanales());
            int resultado = pstmt.executeUpdate();

            //si es diferente de 0 es porq si afecto un registro o mas
            if (resultado == 0) {
                throw new NoDataException("No se realizo la actualización");
            } else {
                System.out.println("\nModificación Satisfactoria!");
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
     
     public void eliminarCurso(String id) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(eliminarCurso);
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
     
     public Collection listarCursoCarrera(String id) throws GlobalException, NoDataException {

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
        Carrera carrera = null;
        Ciclo ciclo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarCursoCarrera);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                ciclo = new Ciclo(rs.getString("cicloId"),rs.getString("cicloAnnio"), rs.getString("cicloNumero"),
                    rs.getDate("cicloFechaInicio"),rs.getDate("cicloFechaFinal"),rs.getInt("cicloActivo"));
                curso = new Curso(rs.getString("id"), rs.getString("codigo"), rs.getString("carreraId"), 
                    rs.getString("cicloId"), rs.getString("nombre"), rs.getString("creditos"), rs.getString("horasSemanales"), 
                        carrera, ciclo);
                coleccion.add(curso);
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
}
