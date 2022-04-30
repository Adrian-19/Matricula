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
public class Curso {
    String id;
    String codigo;
    String carreraId;
    String cicloId;
    String nombre;
    String creditos;
    String horas_semanales;
    Carrera carrera;
    Ciclo ciclo;

    public Curso() {
    }

    public Curso(String id, String codigo, String carreraId, String cicloId, String nombre, String creditos, String horas_semanales, Carrera carrera, Ciclo ciclo) {
        this.id = id;
        this.codigo = codigo;
        this.carreraId = carreraId;
        this.cicloId = cicloId;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horas_semanales = horas_semanales;
        this.carrera = carrera;
        this.ciclo = ciclo;
    }
    
    public Curso(String id, String codigo, String nombre, String creditos, String horasSemanales){
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.creditos = creditos;
        this.horas_semanales = horasSemanales;
    }
    

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Ciclo getCiclo() {
        return ciclo;
    }

    public void setCiclo(Ciclo ciclo) {
        this.ciclo = ciclo;
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

    public String getCarreraId() {
        return carreraId;
    }

    public void setCarreraId(String carreraId) {
        this.carreraId = carreraId;
    }

    public String getCicloId() {
        return cicloId;
    }

    public void setCicloId(String cicloId) {
        this.cicloId = cicloId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCreditos() {
        return creditos;
    }

    public void setCreditos(String creditos) {
        this.creditos = creditos;
    }

    public String getHoras_semanales() {
        return horas_semanales;
    }

    public void setHoras_semanales(String horas_semanales) {
        this.horas_semanales = horas_semanales;
    }

    @Override
    public String toString() {
        return "Curso{" + "id=" + id + ", codigo=" + codigo + ", carreraId=" + carreraId + ", cicloId=" + cicloId + ", nombre=" + nombre + ", creditos=" + creditos + ", horas_semanales=" + horas_semanales + '}';
    }
    
}
