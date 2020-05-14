package com.themakers.storeonline.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Lista.
 */
@Entity
@Table(name = "lista")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lista implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "codigo")
    private String codigo;

    @Lob
    @Column(name = "descripcion")
    private byte[] descripcion;

    @Column(name = "descripcion_content_type")
    private String descripcionContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Lista nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public Lista codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public byte[] getDescripcion() {
        return descripcion;
    }

    public Lista descripcion(byte[] descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(byte[] descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcionContentType() {
        return descripcionContentType;
    }

    public Lista descripcionContentType(String descripcionContentType) {
        this.descripcionContentType = descripcionContentType;
        return this;
    }

    public void setDescripcionContentType(String descripcionContentType) {
        this.descripcionContentType = descripcionContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lista)) {
            return false;
        }
        return id != null && id.equals(((Lista) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Lista{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", descripcionContentType='" + getDescripcionContentType() + "'" +
            "}";
    }
}
