/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Ciclo;
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
public class ServicioCiclo extends Servicio{
    private static final String insertarCiclo = "{call insertar_ciclo (?,?,?)}";
    private static final String listarCiclo = "{?=call listar_ciclo()}";
    private static final String buscarCiclo = "{?=call buscar_ciclo(?)}";
    private static final String modificarCiclo = "{call modificar_ciclo(?,?,?,?)}";
    private static final String eliminarCiclo = "{call eliminar_ciclo(?)}";

    public Collection listarCiclo() throws GlobalException, NoDataException {
        try {
            conectar();
        } catch (ClassNotFoundException ex) {
            throw new GlobalException("No se ha localizado el Driver");
        } catch (SQLException e) {
            throw new NoDataException("La base de datos no se encuentra disponible");
        }

        ResultSet rs = null;
        ArrayList coleccion = new ArrayList();
        Ciclo ciclo = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarCiclo);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                ciclo = new Ciclo(
                        rs.getString("id"),
                        rs.getString("annio"), 
                        rs.getString("numero"),
                        rs.getDate("fechaInicio"),
                        rs.getDate("fechaFinal"),
                        rs.getInt("activo"));
                coleccion.add(ciclo);
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
