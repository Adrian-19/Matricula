/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
import LogicaNegocio.Curso;
import LogicaNegocio.Grupo;
import LogicaNegocio.OfertaAcademica;
import LogicaNegocio.PlanDeEstudio;
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
public class ServicioOfertaAcademica extends Servicio {
     private static final String listarOfertaAcademicaCiclo = "{?=call listar_ofertaAcademica_ciclo(?,?)}";
    
    public Collection listarOfertaAcademicaCiclo(String carreraId, String cicloId) throws GlobalException, NoDataException {

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
        OfertaAcademica ofertaAcademica = null;
        Carrera carrera = null;
        CallableStatement pstmt = null;
        try {
            pstmt = conexion.prepareCall(listarOfertaAcademicaCiclo);
            pstmt.registerOutParameter(1, OracleTypes.CURSOR);
            pstmt.setString(2, carreraId);
            pstmt.setString(3, cicloId);
            pstmt.execute();
            rs = (ResultSet) pstmt.getObject(1);
            while (rs.next()) {
                
                carrera = new Carrera(rs.getString("carreraId"),rs.getString("carreraCodigo"), 
                        rs.getString("carreraNombre"), rs.getString("carreraTitulo"));
                grupo = new Grupo(rs.getString("grupoId"), rs.getString("grupoNumeroGrupo"),
                rs.getString("grupoCicloId"), rs.getString("grupoCursoId"), rs.getString("grupoProfesorId"),
                rs.getString("grupoHorario"), null, null,null);
                ofertaAcademica = new OfertaAcademica(rs.getString("id"),rs.getString("carreraId"),rs.getString("grupoId"),
                    carrera,grupo);
                coleccion.add(ofertaAcademica);
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
