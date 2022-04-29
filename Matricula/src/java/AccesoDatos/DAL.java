/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Alumno;
import LogicaNegocio.Carrera;
import LogicaNegocio.Ciclo;

import LogicaNegocio.Profesor;

import LogicaNegocio.Curso;
import LogicaNegocio.Usuario;

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

    private ServicioCiclo cicloDao;

    private ServicioAlumno alumnoDao;
    
    private ServicioGrupo grupoDao;

    private ServicioAutenticacion autenticacionDao;

    public DAL() {
        carreraDao = new ServicioCarrera();
        cursoDao = new ServicioCurso();
        profesorDao = new ServicioProfesor();
        alumnoDao = new ServicioAlumno();
        cicloDao = new ServicioCiclo();
        grupoDao = new ServicioGrupo();
        autenticacionDao = new ServicioAutenticacion();
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

    public void modificarCarrera(Carrera carrera) throws Exception {
        carreraDao.modificarCarrera(carrera);
        System.out.println("modificada carrera!");
    }

    public void eliminarCarrera(String codigo) throws Exception {
        carreraDao.eliminarCarrera(codigo);
    }

    // PROFESOR
    public Profesor insertarProfesor(Profesor profesor) throws Exception {
        profesorDao.insertarProfesor(profesor);
        Profesor nuevoProfesor = profesorDao.buscarProfesor(profesor.getCedula());
        return nuevoProfesor;
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

    public void eliminarProfesor(String codigo) throws Exception {

        profesorDao.eliminarProfesor(codigo);

    }

    // ALUMNO
    public Alumno insertarAlumno(Alumno alumno) throws Exception {
        alumnoDao.insertarAlumno(alumno);
        Alumno nuevoAlumno = alumnoDao.buscarAlumno(alumno.getCedula());
        return nuevoAlumno;
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

    public Collection listarCursosAlumno(String id) throws Exception {
        return alumnoDao.listarCursosAlumno(id);
    }

    public void modificarAlumno(Alumno alumno) throws Exception {
        alumnoDao.modificarAlumno(alumno);
    }

    public void eliminarAlumno(String id) throws Exception {
        alumnoDao.eliminarAlumno(id);
    }

    // ------- CURSOS -------
    public void insertarCurso(Curso curso) throws Exception {
        cursoDao.insertarCurso(curso);
    }

    public Collection listarCursos() throws Exception {
        return cursoDao.listarCurso();
    }

    public void modificarCurso(Curso curso) throws Exception {
        cursoDao.modificarCurso(curso);
    }

    public void eliminarCurso(String id) throws Exception {
        cursoDao.eliminarCurso(id);
    }
    
    public Collection listarCursoCarrera(String id) throws Exception{
        return cursoDao.listarCursoCarrera(id);
    }

    // ------- CICLOS -------
    public Collection listarCiclos() throws Exception {
        return cicloDao.listarCiclo();
    }
    
    public void modificarCiclo(Ciclo ciclo) throws Exception{
        cicloDao.modificarCiclo(ciclo);
    }
    
    public void insertarCiclo(Ciclo ciclo) throws Exception{
        cicloDao.insertarCiclo(ciclo);
    }
    
    public void eliminarCiclo(String id) throws Exception{
        cicloDao.eliminarCiclo(id);
    }
    
    // ------- GRUPOS -------
    
    public Collection listarGrupoProfesor(String id) throws Exception{
        return grupoDao.listarGrupoProfesor(id);
    }

    // ------- AUTENTICACION -------
    public Usuario login(String cedula, String clave) throws Exception {
        Usuario user = autenticacionDao.login(cedula, clave);
        String rol = user.getRol();
        if ("Administrador".equals(rol) || "Matriculador".equals(rol)) {
            return user;
        } else if ("Profesor".equals(rol)) {
            user.setUsuario(DAL.instance().buscarProfesor(cedula));
        } else if ("Alumno".equals(rol)) {
            user.setUsuario(DAL.instance().buscarAlumno(cedula));
        }
        return user;
    }
}
