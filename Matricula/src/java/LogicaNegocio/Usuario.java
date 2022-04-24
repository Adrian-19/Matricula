/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicaNegocio;

/**
 *
 * @author Jimmy Murillo
 */
public class Usuario {

    private String id;
    private String cedula;
    private String clave;
    private String rol;
    private Object usuario;

    public Usuario() {
        this.id = null;
        this.cedula = null;
        this.clave = null;
        this.usuario = null;
    }
    
    public Usuario(String cedula, String clave) {
        this.cedula = cedula;
        this.clave = clave;
    }

    public Usuario(String id, String cedula, String clave, String rol, Object usuario) {
        this.id = id;
        this.cedula = cedula;
        this.clave = clave;
        this.rol = rol;
        this.usuario = usuario;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Object getUsuario() {
        return usuario;
    }

    public void setUsuario(Object usuario) {
        this.usuario = usuario;
    }

    

}
