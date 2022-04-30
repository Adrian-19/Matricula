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
public class OfertaAcademica {
    String id;
    String carreraId;
    String grupoId;
    Carrera carrera;
    Grupo grupo;

    public OfertaAcademica(){
        
    }
    
    public OfertaAcademica(String id, String carreraId, String grupoId, Carrera carrera, Grupo grupo) {
        this.id = id;
        this.carreraId = carreraId;
        this.grupoId = grupoId;
        this.carrera = carrera;
        this.grupo = grupo;
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

    public String getGrupoId() {
        return grupoId;
    }

    public void setGrupoId(String grupoId) {
        this.grupoId = grupoId;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Grupo getGrupo() {
        return grupo;
    }

    public void setGrupo(Grupo grupo) {
        this.grupo = grupo;
    }
    
    
}
