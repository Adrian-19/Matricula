/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package AccesoDatos;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
/**
 *
 * @author XPC
 */
public class Servicio {
    protected Connection conexion= null;
    
    public Servicio() {
        
    }
    
    protected void conectar() throws SQLException,ClassNotFoundException 
    {
        Class.forName("oracle.jdbc.driver.OracleDriver");
        conexion= DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:XE", "system", "admin");
      
        
    }
    
    protected void desconectar() throws SQLException{
        if(!conexion.isClosed())
        {
            conexion.close();
        }
    }

   
}
