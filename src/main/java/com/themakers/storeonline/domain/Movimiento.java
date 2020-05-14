package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import com.themakers.storeonline.domain.enumeration.TipoMovimiento;

/**
 * A Movimiento.
 */
@Entity
@Table(name = "movimiento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Movimiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoMovimiento tipo;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "sucursal")
    private Long sucursal;

    @Column(name = "motivo")
    private String motivo;

    @Column(name = "observacion")
    private String observacion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoMovimiento getTipo() {
        return tipo;
    }

    public Movimiento tipo(TipoMovimiento tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoMovimiento tipo) {
        this.tipo = tipo;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Movimiento fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Long getSucursal() {
        return sucursal;
    }

    public Movimiento sucursal(Long sucursal) {
        this.sucursal = sucursal;
        return this;
    }

    public void setSucursal(Long sucursal) {
        this.sucursal = sucursal;
    }

    public String getMotivo() {
        return motivo;
    }

    public Movimiento motivo(String motivo) {
        this.motivo = motivo;
        return this;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getObservacion() {
        return observacion;
    }

    public Movimiento observacion(String observacion) {
        this.observacion = observacion;
        return this;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Movimiento)) {
            return false;
        }
        return id != null && id.equals(((Movimiento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Movimiento{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", sucursal=" + getSucursal() +
            ", motivo='" + getMotivo() + "'" +
            ", observacion='" + getObservacion() + "'" +
            "}";
    }
}
