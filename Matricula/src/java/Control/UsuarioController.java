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
@Path("/usuario")
public class UsuarioController {
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    public void insertarUsuario(LogicaNegocio.Usuario usuario){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarUsuario(usuario);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection getAll(){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarUsuariosAdmnins();
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void modificarUsuario(LogicaNegocio.Usuario usuario){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarUsuario(usuario);
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
            service.eliminarUsuario(id);
        } catch (Exception e){
            throw new NotAcceptableException(e.getMessage()); 
        }
    }
    
    
}
