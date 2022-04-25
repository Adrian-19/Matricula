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
public class Grupo {
    String id;
    String numeroGrupo;
    String cicloId;
    String cursoId;
    String profesorId;
    String horario;
    Profesor profesor;
    Ciclo ciclo;
    Curso curso;

    public Grupo(String id, String numeroGrupo, String cicloId, String cursoId, String profesorId, String horario, Profesor profesor, Ciclo ciclo, Curso curso) {
        this.id = id;
        this.numeroGrupo = numeroGrupo;
        this.cicloId = cicloId;
        this.cursoId = cursoId;
        this.profesorId = profesorId;
        this.horario = horario;
        this.profesor = profesor;
        this.ciclo = ciclo;
        this.curso = curso;
    }

    public Grupo(){
        
    }
    
    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Ciclo getCiclo() {
        return ciclo;
    }

    public void setCiclo(Ciclo ciclo) {
        this.ciclo = ciclo;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
    
    
    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumeroGrupo() {
        return numeroGrupo;
    }

    public void setNumeroGrupo(String numeroGrupo) {
        this.numeroGrupo = numeroGrupo;
    }

    public String getCicloId() {
        return cicloId;
    }

    public void setCicloId(String cicloId) {
        this.cicloId = cicloId;
    }

    public String getCursoId() {
        return cursoId;
    }

    public void setCursoId(String cursoId) {
        this.cursoId = cursoId;
    }

    public String getProfesorId() {
        return profesorId;
    }

    public void setProfesorId(String profesorId) {
        this.profesorId = profesorId;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }
    
    
}
