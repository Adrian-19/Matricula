/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import java.util.Collection;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author XPC
 */
@Path("/ofertaAcademica")
public class OfertaAcademicaController {
    @GET
    @Path("{carreraId}/{cicloId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAllPorCarreraCiclo(@PathParam("carreraId") String carreraId, @PathParam("cicloId") String cicloId){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarOfertaAcademicaCiclo(carreraId, cicloId);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
}
