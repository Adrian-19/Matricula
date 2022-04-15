/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;

import LogicaNegocio.Carrera;
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
    
    public DAL (){
        carreraDao = new ServicioCarrera();
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
    
    public void insertarCarrera(Carrera carrera){
        try{
            carreraDao.insertarCarrera(carrera);
            System.out.println("insertada la carrera");
        } catch (Exception ex){
            System.out.println("Exception at insertar");
        }
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
}
