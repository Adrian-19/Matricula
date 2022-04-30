/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author XPC
 */
@Path("/planEstudio")
public class PlanDeEstudioController {
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void insertarPlan(LogicaNegocio.PlanDeEstudio planDeEstudio){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarPlan(planDeEstudio);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAllPorCarrera(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarPlanDeEstudioCarrera(id); // listar_planDeEstudio_carrera
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @DELETE
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void eliminarPlan(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarPlanDeEstudio(id);
        } catch (Exception e){
            throw new NotAcceptableException(e.getMessage()); 
        }
    }
}
