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
public class PlanDeEstudio {
    String id;
    String carreraId;
    String cursoId;
    Carrera carrera;
    Curso curso;

    public PlanDeEstudio(String id, String carreraId, String cursoId, Carrera carrera, Curso curso) {
        this.id = id;
        this.carreraId = carreraId;
        this.cursoId = cursoId;
        this.carrera = carrera;
        this.curso = curso;
    }
    
    public PlanDeEstudio(){
        
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCarreraId() {
        return carreraId;
    }

    public void setCarreraId(String carreraId) {
        this.carreraId = carreraId;
    }

    public String getCursoId() {
        return cursoId;
    }

    public void setCursoId(String cursoId) {
        this.cursoId = cursoId;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
    
}
