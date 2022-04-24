/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Profesor;
import LogicaNegocio.Usuario;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import oracle.jdbc.OracleTypes;

/**
 *
 * @author Jimmy Murillo
 */
public class ServicioAutenticacion extends Servicio {

    private static final String login = "{?=call usuario_login (?,?)}";

    public Usuario login(String lCedula, String lRol) throws GlobalException, NoDataException {

        try {
            conectar();
        } catch (ClassNotFoundException e) {
            throw new GlobalException("No se ha localizado el driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }
        ResultSet rs = null;
        Usuario usuario = null;
        String id = null;
        String cedula = null;
        String clave = null;
        String rol = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(login);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, lCedula);
            pstmt.setString(3, lRol);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                usuario = new Usuario(rs.getString("id"), rs.getString("cedula"), rs.getString("clave"), getRol(Integer.parseInt(rs.getString("rol"))), null);
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
        return usuario;
    }

    private String getRol(int num) {
        switch (num) {
            case 1:
                return "Administrador";
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
