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
import LogicaNegocio.Grupo;
import LogicaNegocio.Matricula;
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
public class ServicioMatricula extends Servicio {
    private static final String modificarMatricula = "{call modificar_matricula (?,?)}";
    private static final String listarMatriculasGrupo = "{?=call listar_matriculas_grupo(?)}";
    
    public Collection listarMatriculasGrupo(String id) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Matricula matricula = null;
        Alumno alumno = null;
        Grupo grupo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarMatriculasGrupo);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                alumno = new Alumno();
                alumno.setId(rs.getString("alumnoId")); alumno.setCedula(rs.getString("alumnoCedula"));
                alumno.setNombre(rs.getString("alumnoNombre")); alumno.setTelefono(rs.getString("alumnoTelefono"));
                alumno.setEmail(rs.getString("alumnoEmail"));
                grupo = new Grupo();
                grupo.setId(rs.getString("grupoId")); grupo.setProfesorId(rs.getString("grupoProfesorId"));
                matricula = new Matricula(rs.getString("id"),rs.getString("numero"), alumno,grupo,rs.getString("nota"));
                
                coleccion.add(matricula);
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

    public void modificarMatricula(Matricula matricula) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(modificarMatricula);
            pstmt.setString(1, matricula.getId());
            pstmt.setString(2, matricula.getNota());
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
}
