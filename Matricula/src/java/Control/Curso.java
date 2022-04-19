/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.ConstrainedTo;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author XPC
 */
@Path("/curso")

public class Curso  {
    @Context
    HttpServletResponse response;
    
    @Context
    ContainerRequestContext requestContext;
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void insertarCurso(LogicaNegocio.Curso curso){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarCurso(curso);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAll(){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarCursos();
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void modificarCurso(LogicaNegocio.Curso curso){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarCurso(curso);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @DELETE
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void eliminarCurso(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarCurso(id);
        } catch (Exception e){
            throw new NotAcceptableException(e.getMessage()); 
        }
    }
}
