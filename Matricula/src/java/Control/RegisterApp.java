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
        return classes;
    }   
}