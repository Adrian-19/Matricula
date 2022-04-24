/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import LogicaNegocio.Profesor;
import com.sun.xml.internal.ws.resources.HttpserverMessages;
import java.util.Collection;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;

/**
 *
 * @author Jimmy Murillo
 */
@Path("/profesor")
public class ProfesorController {

    @Context
    HttpServletRequest request;
    @Context
    HttpServletResponse response;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void registrarProfesor(Profesor profesor) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarProfesor(profesor);
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection listarProfesor() {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.addHeader("Access-Control-Allow-Credentials", "true");
            response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
            response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Authorization, "
                    + "Accept-Version, Content-MD5, CSRF-Token, Content-Type");

            return service.listarProfesor();
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Object buscarProfesor(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.buscarProfesor(id);

        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void modificarProfesor(Profesor profesor) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarProfesor(profesor);
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @DELETE
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public String eliminarProfesor(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            response.addHeader("Access-Control-Allow-Origin", "*");
            response.addHeader("Access-Control-Allow-Credentials", "true");
            response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
            response.addHeader("Access-Control-Allow-Headers", "X-Requested-With, Authorization, "
                    + "Accept-Version, Content-MD5, CSRF-Token, Content-Type");
            service.eliminarProfesor(id);
            
            return "Profesor eliminado correctamente";
            
        } catch (Exception e) {
               
            System.out.println(e.getMessage()); 
            return "ERROR";
        }
    }

}
