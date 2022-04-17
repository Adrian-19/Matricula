/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
import LogicaNegocio.Profesor;
import java.util.Collection;

/**
 *
 * @author XPC
 */
public class DAL {

    private static DAL theInstance;

    public static DAL instance() {
        if (theInstance == null) {
            theInstance = new DAL();
        }
        return theInstance;
    }

    private ServicioCarrera carreraDao;
    private ServicioProfesor profesorDao;

    public DAL() {
        carreraDao = new ServicioCarrera();
        profesorDao = new ServicioProfesor();
    }

    public Collection listarCarrera() {
        try {
            return (carreraDao.listarCarrera());
        } catch (Exception ex) {
            System.out.println("Exception");
        }
        return (null);
    }

    public void insertarCarrera(Carrera carrera) throws Exception {
        carreraDao.insertarCarrera(carrera);
        System.out.println("insertada la carrera");

    }

    public Carrera buscarCarrera(String codigo) {
        Carrera carrera = new Carrera();
        try {
            carrera = carreraDao.buscarCarrera(codigo);
        } catch (Exception ex) {
            System.out.println("Exception at buscar");
        }
        return carrera;
    }

    // PROFESOR
    
    public void insertarProfesor(Profesor profesor) throws Exception {
        profesorDao.insertarProfesor(profesor);
    }

    public Collection listarProfesor() {
        try {
            return (profesorDao.listarProfesor());
        } catch (Exception ex) {
            System.out.println("Exception at listar");
        }
        return (null);
    }

    public Profesor buscarProfesor(String codigo) {
        Profesor profesor = new Profesor();
        try {
            profesor = profesorDao.buscarProfesor(codigo);
        } catch (Exception ex) {
            System.out.println("Exception at buscar");
        }
        return profesor;
    }

    public void modificarProfesor(Profesor profesor) throws Exception {
        profesorDao.modificarProfesor(profesor);
    }

    public void eliminarProfesor(String codigo) {
        try {
            profesorDao.eliminarProfesor(codigo);
        } catch (Exception ex) {
            System.out.println("Exception at eliminar");
        }
    }
    
    
}
