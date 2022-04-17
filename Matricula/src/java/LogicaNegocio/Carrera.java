/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicaNegocio;

/**
 *
 * @author XPC
 */
public class Carrera {
    String id;
    String codigo;
    String nombre;
    String titulo;

    public Carrera(String id, String codigo, String nombre, String titulo) {
        this.id = id;
        this.codigo = codigo;
        
        this.nombre = nombre;
        this.titulo = titulo;
    }

    public Carrera() {
        this.id="";
        this.codigo = "";
        this.nombre = "";
        this.titulo = "";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    @Override
    public String toString() {
        return "Carrera{" + "codigo=" + codigo + ", nombre=" + nombre + ", titulo=" + titulo + '}';
    }

}
