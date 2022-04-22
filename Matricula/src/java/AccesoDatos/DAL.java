/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
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
    private ServicioCurso cursoDao;
    private ServicioCiclo cicloDao;

    public DAL() {
        carreraDao = new ServicioCarrera();
        cursoDao = new ServicioCurso();
        cicloDao = new ServicioCiclo();
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

    public void eliminarCarrera(String codigo) throws Exception {

        carreraDao.eliminarCarrera(codigo);

    }

    public void modificarCarrera(Carrera carrera) throws Exception {
        carreraDao.modificarCarrera(carrera);
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
}
