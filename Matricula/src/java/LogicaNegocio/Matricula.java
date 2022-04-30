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
public class Matricula {
    String id;
    String numero;
    String alumnoId;
    Alumno alumno;
    Grupo grupo;
    String grupoId;
    String nota;

    public Matricula(String id, String numero, Alumno alumno, Grupo grupo, String nota) {
        this.id = id;
        this.numero = numero;
        this.alumno = alumno;
        this.grupo = grupo;
        this.nota = nota;
    }

    public Matricula(String numero, String alumnoId, String grupoId, String nota) {
        this.numero = numero;
        this.alumnoId = alumnoId;
        this.grupoId = grupoId;
        this.nota = nota;
    }
    
    
    
    public Matricula(){
        
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }

    public String getAlumnoId() {
        return alumnoId;
    }

    public void setAlumnoId(String alumnoId) {
        this.alumnoId = alumnoId;
    }

    public String getGrupoId() {
        return grupoId;
    }

    public void setGrupoId(String grupoId) {
        this.grupoId = grupoId;
    }
    
    
    
}
