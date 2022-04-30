/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import LogicaNegocio.Matricula;
import java.util.Collection;
import javax.ws.rs.Consumes;
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
@Path("/matricula")
public class MatriculaController {
    @GET
    @Path("grupo/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAllPorProfesor(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarMatriculasGrupo(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void modificarCurso(LogicaNegocio.Matricula matricula){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarMatricula(matricula);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Path("historial/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getHisotorial(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarHistorial(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Path("cursosCicloActivo/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getCursosCicloActivo(@PathParam("id") String id){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarCursosAlumnoPorCicloActivo(id);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void insertarMatricula(Matricula matricula){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarMatricula(matricula);
            
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
}
