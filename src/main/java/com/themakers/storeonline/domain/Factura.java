package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.Instant;

import com.themakers.storeonline.domain.enumeration.FacturaEstado;

import com.themakers.storeonline.domain.enumeration.ModoPago;

import com.themakers.storeonline.domain.enumeration.TipoFactura;

/**
 * A Factura.
 */
@Entity
@Table(name = "factura")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Factura implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private FacturaEstado estado;

    @Column(name = "fecha")
    private Instant fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "modo_pago")
    private ModoPago modoPago;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_factura")
    private TipoFactura tipoFactura;

    @Column(name = "fecha_pago")
    private Instant fechaPago;

    @Column(name = "cantidad", precision = 21, scale = 2)
    private BigDecimal cantidad;

    @Column(name = "sucursal")
    private Long sucursal;

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

    public Factura codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public FacturaEstado getEstado() {
        return estado;
    }

    public Factura estado(FacturaEstado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(FacturaEstado estado) {
        this.estado = estado;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Factura fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public ModoPago getModoPago() {
        return modoPago;
    }

    public Factura modoPago(ModoPago modoPago) {
        this.modoPago = modoPago;
        return this;
    }

    public void setModoPago(ModoPago modoPago) {
        this.modoPago = modoPago;
    }

    public TipoFactura getTipoFactura() {
        return tipoFactura;
    }

    public Factura tipoFactura(TipoFactura tipoFactura) {
        this.tipoFactura = tipoFactura;
        return this;
    }

    public void setTipoFactura(TipoFactura tipoFactura) {
        this.tipoFactura = tipoFactura;
    }

    public Instant getFechaPago() {
        return fechaPago;
    }

    public Factura fechaPago(Instant fechaPago) {
        this.fechaPago = fechaPago;
        return this;
    }

    public void setFechaPago(Instant fechaPago) {
        this.fechaPago = fechaPago;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public Factura cantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public Long getSucursal() {
        return sucursal;
    }

    public Factura sucursal(Long sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Long sucursal) {
        this.sucursal = sucursal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Factura)) {
            return false;
        }
        return id != null && id.equals(((Factura) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Factura{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", estado='" + getEstado() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", modoPago='" + getModoPago() + "'" +
            ", tipoFactura='" + getTipoFactura() + "'" +
            ", fechaPago='" + getFechaPago() + "'" +
            ", cantidad=" + getCantidad() +
            ", sucursal=" + getSucursal() +
            "}";
    }
}
