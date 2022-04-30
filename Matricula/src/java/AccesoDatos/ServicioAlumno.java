/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Alumno;
import LogicaNegocio.Carrera;
import LogicaNegocio.Ciclo;
import LogicaNegocio.Curso;
import java.sql.CallableStatement;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author Jimmy Murillo
 */
public class ServicioAlumno extends Servicio {

    private static final String insertarAlumno = "{call insertar_alumno (?,?,?,?,?,?)}";
    private static final String listarAlumno = "{?=call listar_alumno()}";
    private static final String listarCursosAlumno = "{?=call listar_cursos_alumno(?)}";
    private static final String buscarAlumno = "{?=call buscar_alumno(?)}";
    private static final String modificarAlumno = "{call modificar_alumno (?,?,?,?,?,?,?)}";
    private static final String eliminarAlumno = "{call eliminar_alumno(?)}";

    public void insertarAlumno(Alumno alumno) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        CallableStatement pstmt = null;

        try {
            pstmt = conexion.prepareCall(insertarAlumno);
            pstmt.setString(1, alumno.getCedula());
            pstmt.setString(2, alumno.getNombre());
            pstmt.setString(3, alumno.getTelefono());
            pstmt.setString(4, alumno.getEmail());
            pstmt.setDate(5, alumno.getFechaNacimiento());
            pstmt.setString(6, alumno.getCarreraId());

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

    public Collection listarAlumno() throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
//        String id, String codigo, String nombre, String titulo
//        String id, String cedula, String nombre, String telefono, String email, Date fechaNacimiento, String carreraId, Carrera carrera

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarAlumno);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                Carrera carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                Alumno alumno = new Alumno(rs.getString("alumnoId"), rs.getString("alumnoCedula"), rs.getString("alumnoNombre"), rs.getString("alumnoTelefono"),
                        rs.getString("alumnoEmail"), rs.getDate("alumnoFechaNacimiento"), rs.getString("carreraId"), carrera);
                coleccion.add(alumno);
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
    
    public Collection listarCursosAlumno(String id) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
//        String id, String codigo, String nombre, String titulo
//        String id, String cedula, String nombre, String telefono, String email, Date fechaNacimiento, String carreraId, Carrera carrera

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Curso curso = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarCursosAlumno);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
               Carrera carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                Ciclo ciclo = new Ciclo(rs.getString("cicloId"),rs.getString("cicloAnnio"), rs.getString("cicloNumero"),
                    rs.getDate("cicloFechaInicio"),rs.getDate("cicloFechaFinal"),rs.getInt("cicloActivo"));
                curso = new Curso(rs.getString("cursoId"), rs.getString("cursoCodigo"), rs.getString("cursoNombre"), rs.getString("cursoCreditos"), rs.getString("cursoHorasSemanales"));
                        
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

    public Alumno buscarAlumno(String cedula) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        Alumno alumno = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(buscarAlumno);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, cedula);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                Carrera carrera = new Carrera(rs.getString("carreraId"), rs.getString("carreraCodigo"), rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                alumno = new Alumno(rs.getString("alumnoId"), rs.getString("alumnoCedula"), rs.getString("alumnoNombre"), rs.getString("alumnoTelefono"),
                        rs.getString("alumnoEmail"), rs.getDate("alumnoFechaNacimiento"), rs.getString("carreraId"), carrera);
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
        return alumno;
    }

    public void modificarAlumno(Alumno alumno) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(modificarAlumno);
            pstmt.setString(1, alumno.getId());
            pstmt.setString(2, alumno.getCedula());
            pstmt.setString(3, alumno.getNombre());
            pstmt.setString(4, alumno.getTelefono());
            pstmt.setString(5, alumno.getEmail());
            pstmt.setDate(6, alumno.getFechaNacimiento());
            pstmt.setString(7, alumno.getCarreraId());

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

    public void eliminarAlumno(String id) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(eliminarAlumno);
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
