package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Factura;
import com.themakers.storeonline.repository.FacturaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.themakers.storeonline.domain.enumeration.FacturaEstado;
import com.themakers.storeonline.domain.enumeration.ModoPago;
import com.themakers.storeonline.domain.enumeration.TipoFactura;
/**
 * Integration tests for the {@link FacturaResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class FacturaResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final FacturaEstado DEFAULT_ESTADO = FacturaEstado.PAGADO;
    private static final FacturaEstado UPDATED_ESTADO = FacturaEstado.PENDIENTE;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ModoPago DEFAULT_MODO_PAGO = ModoPago.EFECTIVO;
    private static final ModoPago UPDATED_MODO_PAGO = ModoPago.TARJETA_CREDITO;

    private static final TipoFactura DEFAULT_TIPO_FACTURA = TipoFactura.COMPRA;
    private static final TipoFactura UPDATED_TIPO_FACTURA = TipoFactura.VENTA;

    private static final Instant DEFAULT_FECHA_PAGO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_PAGO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_CANTIDAD = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD = new BigDecimal(2);

    private static final Long DEFAULT_SUCURSAL = 1L;
    private static final Long UPDATED_SUCURSAL = 2L;

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacturaMockMvc;

    private Factura factura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Factura createEntity(EntityManager em) {
        Factura factura = new Factura()
            .codigo(DEFAULT_CODIGO)
            .estado(DEFAULT_ESTADO)
            .fecha(DEFAULT_FECHA)
            .modoPago(DEFAULT_MODO_PAGO)
            .tipoFactura(DEFAULT_TIPO_FACTURA)
            .fechaPago(DEFAULT_FECHA_PAGO)
            .cantidad(DEFAULT_CANTIDAD)
            .sucursal(DEFAULT_SUCURSAL);
        return factura;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Factura createUpdatedEntity(EntityManager em) {
        Factura factura = new Factura()
            .codigo(UPDATED_CODIGO)
            .estado(UPDATED_ESTADO)
            .fecha(UPDATED_FECHA)
            .modoPago(UPDATED_MODO_PAGO)
            .tipoFactura(UPDATED_TIPO_FACTURA)
            .fechaPago(UPDATED_FECHA_PAGO)
            .cantidad(UPDATED_CANTIDAD)
            .sucursal(UPDATED_SUCURSAL);
        return factura;
    }

    @BeforeEach
    public void initTest() {
        factura = createEntity(em);
    }

    @Test
    @Transactional
    public void createFactura() throws Exception {
        int databaseSizeBeforeCreate = facturaRepository.findAll().size();

        // Create the Factura
        restFacturaMockMvc.perform(post("/api/facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factura)))
            .andExpect(status().isCreated());

        // Validate the Factura in the database
        List<Factura> facturaList = facturaRepository.findAll();
        assertThat(facturaList).hasSize(databaseSizeBeforeCreate + 1);
        Factura testFactura = facturaList.get(facturaList.size() - 1);
        assertThat(testFactura.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testFactura.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testFactura.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testFactura.getModoPago()).isEqualTo(DEFAULT_MODO_PAGO);
        assertThat(testFactura.getTipoFactura()).isEqualTo(DEFAULT_TIPO_FACTURA);
        assertThat(testFactura.getFechaPago()).isEqualTo(DEFAULT_FECHA_PAGO);
        assertThat(testFactura.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testFactura.getSucursal()).isEqualTo(DEFAULT_SUCURSAL);
    }

    @Test
    @Transactional
    public void createFacturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facturaRepository.findAll().size();

        // Create the Factura with an existing ID
        factura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacturaMockMvc.perform(post("/api/facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factura)))
            .andExpect(status().isBadRequest());

        // Validate the Factura in the database
        List<Factura> facturaList = facturaRepository.findAll();
        assertThat(facturaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacturas() throws Exception {
        // Initialize the database
        facturaRepository.saveAndFlush(factura);

        // Get all the facturaList
        restFacturaMockMvc.perform(get("/api/facturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(factura.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].modoPago").value(hasItem(DEFAULT_MODO_PAGO.toString())))
            .andExpect(jsonPath("$.[*].tipoFactura").value(hasItem(DEFAULT_TIPO_FACTURA.toString())))
            .andExpect(jsonPath("$.[*].fechaPago").value(hasItem(DEFAULT_FECHA_PAGO.toString())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].sucursal").value(hasItem(DEFAULT_SUCURSAL.intValue())));
    }
    
    @Test
    @Transactional
    public void getFactura() throws Exception {
        // Initialize the database
        facturaRepository.saveAndFlush(factura);

        // Get the factura
        restFacturaMockMvc.perform(get("/api/facturas/{id}", factura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(factura.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.modoPago").value(DEFAULT_MODO_PAGO.toString()))
            .andExpect(jsonPath("$.tipoFactura").value(DEFAULT_TIPO_FACTURA.toString()))
            .andExpect(jsonPath("$.fechaPago").value(DEFAULT_FECHA_PAGO.toString()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.sucursal").value(DEFAULT_SUCURSAL.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFactura() throws Exception {
        // Get the factura
        restFacturaMockMvc.perform(get("/api/facturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFactura() throws Exception {
        // Initialize the database
        facturaRepository.saveAndFlush(factura);

        int databaseSizeBeforeUpdate = facturaRepository.findAll().size();

        // Update the factura
        Factura updatedFactura = facturaRepository.findById(factura.getId()).get();
        // Disconnect from session so that the updates on updatedFactura are not directly saved in db
        em.detach(updatedFactura);
        updatedFactura
            .codigo(UPDATED_CODIGO)
            .estado(UPDATED_ESTADO)
            .fecha(UPDATED_FECHA)
            .modoPago(UPDATED_MODO_PAGO)
            .tipoFactura(UPDATED_TIPO_FACTURA)
            .fechaPago(UPDATED_FECHA_PAGO)
            .cantidad(UPDATED_CANTIDAD)
            .sucursal(UPDATED_SUCURSAL);

        restFacturaMockMvc.perform(put("/api/facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFactura)))
            .andExpect(status().isOk());

        // Validate the Factura in the database
        List<Factura> facturaList = facturaRepository.findAll();
        assertThat(facturaList).hasSize(databaseSizeBeforeUpdate);
        Factura testFactura = facturaList.get(facturaList.size() - 1);
        assertThat(testFactura.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testFactura.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testFactura.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testFactura.getModoPago()).isEqualTo(UPDATED_MODO_PAGO);
        assertThat(testFactura.getTipoFactura()).isEqualTo(UPDATED_TIPO_FACTURA);
        assertThat(testFactura.getFechaPago()).isEqualTo(UPDATED_FECHA_PAGO);
        assertThat(testFactura.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testFactura.getSucursal()).isEqualTo(UPDATED_SUCURSAL);
    }

    @Test
    @Transactional
    public void updateNonExistingFactura() throws Exception {
        int databaseSizeBeforeUpdate = facturaRepository.findAll().size();

        // Create the Factura

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacturaMockMvc.perform(put("/api/facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(factura)))
            .andExpect(status().isBadRequest());

        // Validate the Factura in the database
        List<Factura> facturaList = facturaRepository.findAll();
        assertThat(facturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFactura() throws Exception {
        // Initialize the database
        facturaRepository.saveAndFlush(factura);

        int databaseSizeBeforeDelete = facturaRepository.findAll().size();

        // Delete the factura
        restFacturaMockMvc.perform(delete("/api/facturas/{id}", factura.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Factura> facturaList = facturaRepository.findAll();
        assertThat(facturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
