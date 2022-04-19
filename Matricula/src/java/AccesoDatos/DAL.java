/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Alumno;
import LogicaNegocio.Carrera;

import LogicaNegocio.Profesor;

import LogicaNegocio.Curso;

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
    
    private ServicioCurso cursoDao;
    
    private ServicioAlumno alumnoDao;

    public DAL (){
        carreraDao = new ServicioCarrera();
        cursoDao = new ServicioCurso();
        profesorDao = new ServicioProfesor();
        alumnoDao = new ServicioAlumno();
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
    
    public void modificarCarrera(Carrera carrera) throws Exception{
        carreraDao.modificarCarrera(carrera);
        System.out.println("modificada carrera!");
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
            System.out.println(ex.getMessage());
            System.out.println("Exception at eliminar");
            
        }
    }
    
    // ALUMNO
    
     public void insertarAlumno(Alumno alumno) throws Exception {
        alumnoDao.insertarAlumno(alumno);
    }

    public Collection listarAlumno() {
        try {
            return alumnoDao.listarAlumno();
        } catch (Exception ex) {
            System.out.println("Exception at listar");
        }
        return (null);
    }

    public Alumno buscarAlumno(String id) {
        Alumno alumno = new Alumno();
        try {
            alumno = alumnoDao.buscarAlumno(id);
        } catch (Exception ex) {
            System.out.println("Exception at buscar");
        }
        return alumno;
    }
    
    public Collection listarCursosAlumno(String id)throws Exception {
       return alumnoDao.listarCursosAlumno(id);
    }

    public void modificarAlumno(Alumno alumno) throws Exception {
        alumnoDao.modificarAlumno(alumno);
    }

    public void eliminarAlumno(String id) {
        try {
            alumnoDao.eliminarAlumno(id);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            System.out.println("Exception at eliminar");
            
        }
    }

    
    // ------- CURSOS -------
    public Collection listarCursos() throws Exception{
        return cursoDao.listarCurso();
    }

}
