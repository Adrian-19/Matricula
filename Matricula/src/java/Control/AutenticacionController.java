/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import LogicaNegocio.Usuario;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Jimmy Murillo
 */
@Path("/autenticacion")
public class AutenticacionController {

    @Context
    HttpServletRequest request;
    @Context
    HttpServletResponse response;

    @POST
    @Path("login")
    @Produces({MediaType.APPLICATION_JSON})
    public Usuario login(Usuario usuario) {
        try {

            AccesoDatos.DAL service = AccesoDatos.DAL.instance();
            return service.login(usuario.getCedula(), usuario.getClave());
        } catch (Exception e) {
            throw new NotAcceptableException();
        }
    }
}
