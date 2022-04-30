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
import javax.ws.rs.PUT;
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
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void registrarGrupo(LogicaNegocio.Grupo grupo){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarGrupo(grupo);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Path("{profesorId}/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection buscarGrupos(@PathParam("id") String id, @PathParam("profesorId") String profesorId){
           try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.buscarGrupoProfesor(id, profesorId);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
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
    
    @GET
    @Path("curso/{cursoId}/{cicloId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAllPorCurso(@PathParam("cursoId") String cursoId,@PathParam("cicloId") String cicloId){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarGrupoCurso(cursoId, cicloId);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void modificarGrupo(LogicaNegocio.Grupo grupo){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarGrupo(grupo);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @DELETE
    @Path("{id}")
    public void eliminarGrupo(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarGrupo(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
}
