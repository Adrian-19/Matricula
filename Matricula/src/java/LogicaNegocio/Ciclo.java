/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogicaNegocio;

import java.sql.Date;





/**
 *
 * @author XPC
 */
public class Ciclo {
    String id;
    String annio;
    String numero;
    Date fechaInicio;
    Date fechaFinal;
    int activo;

    public Ciclo() {
    }

    public Ciclo(String id, String annio, String numero, Date fechaInicio, Date fechaFinal, int activo) {
        this.id = id;
        this.annio = annio;
        this.numero = numero;
        this.fechaInicio = fechaInicio;
        this.fechaFinal = fechaFinal;
        this.activo = activo;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnnio() {
        return annio;
    }

    public void setAnnio(String annio) {
        this.annio = annio;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Date getFechaFinal() {
        return fechaFinal;
    }

    public void setFechaFinal(Date fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Ciclo{" + "id=" + id + ", annio=" + annio + ", numero=" + numero + ", fechaInicio=" + fechaInicio + ", fechaFinal=" + fechaFinal + ", activo=" + activo + '}';
    }
    
    
    
}
