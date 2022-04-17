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
    
    public DAL (){
        carreraDao = new ServicioCarrera();
        cursoDao = new ServicioCurso();
    }
    
    public Collection listarCarrera(){
        try{
            return (carreraDao.listarCarrera());
        }
        catch (Exception ex){
            System.out.println("Exception");
        }
        return(null);
    }
    
    public void insertarCarrera(Carrera carrera) throws Exception{
        
        carreraDao.insertarCarrera(carrera);
        System.out.println("insertada la carrera");
        
    }
    
    public Carrera buscarCarrera(String codigo){
        Carrera carrera = new Carrera();
        try{
            carrera = carreraDao.buscarCarrera(codigo);
        } catch (Exception ex){
            System.out.println("Exception at buscar");
        }
        return carrera;
    }
    
    public void eliminarCarrera(String codigo){
        try{
            carreraDao.eliminarCarrera(codigo);
        } catch (Exception ex){
            System.out.println("Exception at eliminar");
        }
    }
    
    public void modificarCarrera(Carrera carrera) throws Exception{
        carreraDao.modificarCarrera(carrera);
        System.out.println("modificada carrera!");
    }
    
    // ------- CURSOS -------
    public Collection listarCursos() throws Exception{
        return cursoDao.listarCurso();
    }
}
