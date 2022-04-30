/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
import LogicaNegocio.Ciclo;
import LogicaNegocio.Curso;
import LogicaNegocio.Usuario;
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
public class ServicioUsuario extends Servicio{
    private static final String insertarUsuario = "{call insertar_usuario (?,?,?)}";
    private static final String listarUsuariosAdmnins = "{?=call listar_usuarios_admnins()}";
    private static final String eliminarUsuario = "{call eliminar_usuario(?)}";
    private static final String modificarUsuario = "{call modificar_usuario (?,?,?,?)}";
    
    public void insertarUsuario(Usuario usuario) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        CallableStatement pstmt = null;

        try {

            pstmt = conexion.prepareCall(insertarUsuario);
            pstmt.setString(1, usuario.getCedula());
            pstmt.setString(2, usuario.getClave());
            pstmt.setString(3, usuario.getRol());

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
    
    public Collection listarUsuariosAdmnins() throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Usuario usuario = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarUsuariosAdmnins);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                   usuario = new Usuario(rs.getString("id"),rs.getString("cedula"),rs.getString("clave"),
                   getRol(Integer.parseInt(rs.getString("rol"))),null);
                coleccion.add(usuario);
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
    
    public void modificarUsuario(Usuario usuario) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(modificarUsuario);
            pstmt.setString(1, usuario.getId());
            pstmt.setString(2, usuario.getCedula());
            pstmt.setString(3, usuario.getClave());
            pstmt.setString(4, usuario.getRol());
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
    
    public void eliminarUsuario(String id) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(eliminarUsuario);
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
    
    private String getRol(int num) {
        switch (num) {
            case 1:
                return "Admin";
            case 2:
                return "Matriculador";
            case 3:
                return "Profesor";
            case 4:
                return "Alumno";
            default:
                return null;
        }
    }
}
