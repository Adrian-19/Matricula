/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Control;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 *
 * @author XPC
 */
@ApplicationPath("api")
public class RegisterApp extends Application {
    @Override
    public Set<Class<?>> getClasses() {

        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Carrera.class); 
        classes.add(ProfesorController.class);
        classes.add(Curso.class);
        classes.add(Ciclo.class);
        classes.add(AlumnoController.class);
        classes.add(AutenticacionController.class);
        classes.add(CrossOriginResourceSharingFilter.class);
        classes.add(GrupoController.class);
        classes.add(MatriculaController.class);
        classes.add(UsuarioController.class);
        classes.add(PlanDeEstudioController.class);
        classes.add(OfertaAcademicaController.class);
        
        return classes;
    }   
}