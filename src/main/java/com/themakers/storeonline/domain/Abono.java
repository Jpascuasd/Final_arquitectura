package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * A Abono.
 */
@Entity
@Table(name = "abono")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Abono implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "usuario")
    private Long usuario;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "cantidad_valor", precision = 21, scale = 2)
    private BigDecimal cantidadValor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuario() {
        return usuario;
    }

    public Abono usuario(Long usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Long usuario) {
        this.usuario = usuario;
    }

    public Instant getFecha() {
        return fecha;
    }

    public Abono fecha(Instant fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getCodigo() {
        return codigo;
    }

    public Abono codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public BigDecimal getCantidadValor() {
        return cantidadValor;
    }

    public Abono cantidadValor(BigDecimal cantidadValor) {
        this.cantidadValor = cantidadValor;
        return this;
    }

    public void setCantidadValor(BigDecimal cantidadValor) {
        this.cantidadValor = cantidadValor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Abono)) {
            return false;
        }
        return id != null && id.equals(((Abono) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Abono{" +
            "id=" + getId() +
            ", usuario=" + getUsuario() +
            ", fecha='" + getFecha() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", cantidadValor=" + getCantidadValor() +
            "}";
    }
}
