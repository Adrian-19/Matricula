/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication1;

import AccesoDatos.ServicioCarrera;
import LogicaNegocio.Carrera;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Collection;


/**
 *
 * @author XPC
 */
public class JavaApplication1{

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        AccesoDatos.DAL service = AccesoDatos.DAL.instance();
        
        
        // service.insertarCarrera(new Carrera("BIO", "Biologia", "Bachillerato"));
        
        // System.out.println("found " + service.buscarCarrera("BIO"));
        
        service.eliminarCarrera("BIO");
        
        Collection collection = service.listarCarrera();
        if(collection != null){
            System.out.println(collection);
        }
        else{
            System.out.println("yep, empty");
        }
    }
    
}
