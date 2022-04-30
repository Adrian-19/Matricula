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
import LogicaNegocio.Profesor;
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
public class ServicioGrupo extends Servicio{
    private static final String insertarGrupo = "{call insertar_grupo (?,?,?,?,?)}";
    private static final String listarGrupo = "{?=call listar_grupo()}";
    private static final String listarGrupoProfesor = "{?=call listar_grupo_profesor(?)}";
    private static final String buscarGrupo = "{?=call buscar_grupo(?)}";
    private static final String modificarGrupo = "{call modificar_grupo(?,?,?,?,?,?)}";
    private static final String eliminarGrupo = "{call eliminar_grupo(?)}";
    private static final String buscarGrupoProfesor = "{?=call buscar_grupo_profesor(?,?)}";
    
    public Collection listarGrupoProfesor(String id) throws GlobalException, NoDataException {

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
        Profesor profesor = null;
        Ciclo ciclo = null;
        Grupo grupo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarGrupoProfesor);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                
                ciclo = new Ciclo();
                ciclo.setAnnio(rs.getString("cicloAnnio")); ciclo.setNumero(rs.getString("cicloNumero"));
                ciclo.setActivo(rs.getInt("cicloActivo"));
                curso = new Curso();
                curso.setCodigo(rs.getString("cursoCodigo")); curso.setNombre(rs.getString("cursoNombre"));
                profesor = new Profesor();
                profesor.setId(rs.getString("profesorId")); profesor.setNombre(rs.getString("profesorNombre"));
                grupo = new Grupo(rs.getString("id"), rs.getString("numeroGrupo"), 
                        rs.getString("cicloId"), rs.getString("cursoId"), rs.getString("profesorId"), 
                        rs.getString("horario"), profesor, ciclo, curso );
                coleccion.add(grupo);
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

    public Collection buscarGrupoProfesor(String id, String profesorId) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Grupo grupo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(buscarGrupoProfesor);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, id);
            pstmt.setString(3, profesorId);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                grupo = new Grupo();
                grupo.setId(rs.getString("id"));
                coleccion.add(grupo);
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
