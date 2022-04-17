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
 * @author XPC
 */

@Path("/carrera")
public class Carrera {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void registrarCarrera(LogicaNegocio.Carrera carrera){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.insertarCarrera(carrera);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void modificarCarrera(LogicaNegocio.Carrera carrera){
        try{
            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            service.modificarCarrera(carrera);
        } catch (Exception e){
            throw new NotAcceptableException(); 
        }
    }

}
