/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

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
 * @author Jimmy Murillo
 */
public class ServicioProfesor extends Servicio {
    
    private static final String insertarProfesor = "{call insertar_profesor (?,?,?,?)}";
    private static final String listarProfesor = "{?=call listar_profesor()}";
    private static final String buscarProfesor = "{?=call buscar_profesor(?)}";
    private static final String modificarProfesor = "{call modificar_profesor (?,?,?,?)}";
    private static final String eliminarProfesor = "{call eliminar_profesor(?)}";
    
    public void insertarProfesor(Profesor Profesor) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        CallableStatement pstmt = null;

        try {

            pstmt = conexion.prepareCall(insertarProfesor);
            pstmt.setString(1, Profesor.getCedula());
            pstmt.setString(2, Profesor.getNombre());
            pstmt.setString(3, Profesor.getTelefono());
            pstmt.setString(4, Profesor.getEmail());

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
    
    public Collection listarProfesor() throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Profesor Profesor = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarProfesor);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                Profesor = new Profesor(rs.getString("id"), rs.getString("cedula"), rs.getString("nombre"),rs.getString("email"));
                coleccion.add(Profesor);
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
    
    public Profesor buscarProfesor(String codigo) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Profesor Profesor = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(buscarProfesor);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, codigo);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                Profesor = new Profesor(rs.getString("id"), rs.getString("cedula"), rs.getString("nombre"),rs.getString("email"));
                coleccion.add(Profesor);
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
        return Profesor;
    }
    
    public void modificarProfesor(Profesor Profesor) throws GlobalException, NoDataException
    {
        
        try
        {
            conectar();
        }
        catch (ClassNotFoundException e)
        {
            throw new GlobalException("No se ha localizado el driver");
        }
        catch (SQLException e)
        {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try
        {
            pstmt = conexion.prepareStatement(modificarProfesor);
            pstmt.setString(1, Profesor.getId());
            pstmt.setString(2, Profesor.getCedula());
            pstmt.setString(3, Profesor.getNombre());
            pstmt.setString(4, Profesor.getEmail());
            int resultado = pstmt.executeUpdate();

            //si es diferente de 0 es porq si afecto un registro o mas
            if (resultado == 0)
            {
                throw new NoDataException("No se realizo la actualización");
            }
            else
            {
                System.out.println("\nModificación Satisfactoria!");
            }
        }
        catch (SQLException e)
        {
            throw new GlobalException("Sentencia no valida");
        }
        finally
        {
            try
            {
                if (pstmt != null)
                {
                    pstmt.close();
                }
                desconectar();
            }
            catch (SQLException e)
            {
                throw new GlobalException("Estatutos invalidos o nulos");
            }
        }
    }
    
    
    public void eliminarProfesor(String codigo) throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        PreparedStatement pstmt = null;
        try {
            pstmt = conexion.prepareStatement(eliminarProfesor);
            pstmt.setString(1, codigo);

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
