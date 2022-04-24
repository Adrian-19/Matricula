/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import java.util.Collection;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author XPC
 */
@Path("/ciclo")
public class Ciclo {
    @Context
    HttpServletResponse response;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void registrarCiclo(LogicaNegocio.Ciclo ciclo){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarCiclo(ciclo);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAll(){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarCiclos();
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void modificarCiclo(LogicaNegocio.Ciclo ciclo){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarCiclo(ciclo);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @DELETE
    @Path("{id}")
    public void eliminarCiclo(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarCiclo(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
}
