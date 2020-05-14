package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DetalleFactura.
 */
@Entity
@Table(name = "detalle_factura")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DetalleFactura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "producto")
    private String producto;

    @Column(name = "codigo_producto")
    private String codigoProducto;

    @Column(name = "cantidad")
    private String cantidad;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public DetalleFactura producto(String producto) {
        this.producto = producto;
        return this;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getCodigoProducto() {
        return codigoProducto;
    }

    public DetalleFactura codigoProducto(String codigoProducto) {
        this.codigoProducto = codigoProducto;
        return this;
    }

    public void setCodigoProducto(String codigoProducto) {
        this.codigoProducto = codigoProducto;
    }

    public String getCantidad() {
        return cantidad;
    }

    public DetalleFactura cantidad(String cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleFactura)) {
            return false;
        }
        return id != null && id.equals(((DetalleFactura) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleFactura{" +
            "id=" + getId() +
            ", producto='" + getProducto() + "'" +
            ", codigoProducto='" + getCodigoProducto() + "'" +
            ", cantidad='" + getCantidad() + "'" +
            "}";
    }
}
