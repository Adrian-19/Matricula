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
public class HistorialAcademico {
    
    private String matriculaId;
    private String numero;
    private String nota;
    private Ciclo ciclo;
    private Curso curso;
    private Grupo grupo;

    public HistorialAcademico(String matriculaId, String numero, String nota, Ciclo ciclo, Curso curso, Grupo grupo) {
        this.matriculaId = matriculaId;
        this.numero = numero;
        this.nota = nota;
        this.ciclo = ciclo;
        this.curso = curso;
        this.grupo = grupo;
    }

    public String getMatriculaId() {
        return matriculaId;
    }

    public void setMatriculaId(String matriculaId) {
        this.matriculaId = matriculaId;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
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

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }

   
    
    
    
    
}
