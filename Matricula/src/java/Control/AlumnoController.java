/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import LogicaNegocio.Alumno;
import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
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
 * @author Jimmy Murillo
 */
@Path("/alumno")
public class AlumnoController {

    @Context
    HttpServletRequest request;
    @Context
    HttpServletResponse response;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Alumno registrarAlumno(Alumno alumno) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            Alumno nuevoAlumno = service.insertarAlumno(alumno);
            return nuevoAlumno;
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public Collection listarAlumno() {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarAlumno();
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Object buscarAlumno(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.buscarAlumno(id);

        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }
    
    @GET
    @Path("{id}/cursos")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection listarCursosAlumno(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.listarCursosAlumno(id);

        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    public void modificarAlumno(Alumno alumno) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarAlumno(alumno);
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }

    @DELETE
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void eliminarAlumno(@PathParam("id") String id) {
        try {
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.eliminarAlumno(id);

        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }
    
}