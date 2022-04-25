/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import LogicaNegocio.Profesor;
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
    @Produces(MediaType.APPLICATION_JSON)
    public Profesor registrarProfesor(Profesor profesor) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            Profesor nuevoProfesor = service.insertarProfesor(profesor);
            return nuevoProfesor;
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection listarProfesor() {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();

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
    public void eliminarProfesor(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarProfesor(id);
                        
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

}
