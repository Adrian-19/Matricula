/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.core.Context;

/**
 *
 * @author Jimmy Murillo
 */
@Path("/profesor")
public class Profesor {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void registrarProfesor(LogicaNegocio.Profesor profesor){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarProfesor(profesor);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
}
