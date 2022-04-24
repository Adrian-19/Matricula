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
@Path("/grupo")
public class GrupoController {
    
    @GET
    @Path("profesor/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAllPorProfesor(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarGrupoProfesor(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
}
