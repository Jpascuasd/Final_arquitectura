package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A DetalleMovimiento.
 */
@Entity
@Table(name = "detalle_movimiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleMovimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "producto")
    private Long producto;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "fecha")
    private Instant fecha;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public DetalleMovimiento codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public DetalleMovimiento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getProducto() {
        return producto;
    }

    public DetalleMovimiento producto(Long producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(Long producto) {
        this.producto = producto;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public DetalleMovimiento cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Instant getFecha() {
        return fecha;
    }

    public DetalleMovimiento fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleMovimiento)) {
            return false;
        }
        return id != null && id.equals(((DetalleMovimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleMovimiento{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", producto=" + getProducto() +
            ", cantidad=" + getCantidad() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
