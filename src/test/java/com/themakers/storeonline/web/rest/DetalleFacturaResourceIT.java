package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.DetalleFactura;
import com.themakers.storeonline.repository.DetalleFacturaRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DetalleFacturaResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DetalleFacturaResourceIT {

    private static final String DEFAULT_PRODUCTO = "AAAAAAAAAA";
    private static final String UPDATED_PRODUCTO = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_PRODUCTO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_PRODUCTO = "BBBBBBBBBB";

    private static final String DEFAULT_CANTIDAD = "AAAAAAAAAA";
    private static final String UPDATED_CANTIDAD = "BBBBBBBBBB";

    @Autowired
    private DetalleFacturaRepository detalleFacturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetalleFacturaMockMvc;

    private DetalleFactura detalleFactura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleFactura createEntity(EntityManager em) {
        DetalleFactura detalleFactura = new DetalleFactura()
            .producto(DEFAULT_PRODUCTO)
            .codigoProducto(DEFAULT_CODIGO_PRODUCTO)
            .cantidad(DEFAULT_CANTIDAD);
        return detalleFactura;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleFactura createUpdatedEntity(EntityManager em) {
        DetalleFactura detalleFactura = new DetalleFactura()
            .producto(UPDATED_PRODUCTO)
            .codigoProducto(UPDATED_CODIGO_PRODUCTO)
            .cantidad(UPDATED_CANTIDAD);
        return detalleFactura;
    }

    @BeforeEach
    public void initTest() {
        detalleFactura = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleFactura() throws Exception {
        int databaseSizeBeforeCreate = detalleFacturaRepository.findAll().size();

        // Create the DetalleFactura
        restDetalleFacturaMockMvc.perform(post("/api/detalle-facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleFactura)))
            .andExpect(status().isCreated());

        // Validate the DetalleFactura in the database
        List<DetalleFactura> detalleFacturaList = detalleFacturaRepository.findAll();
        assertThat(detalleFacturaList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleFactura testDetalleFactura = detalleFacturaList.get(detalleFacturaList.size() - 1);
        assertThat(testDetalleFactura.getProducto()).isEqualTo(DEFAULT_PRODUCTO);
        assertThat(testDetalleFactura.getCodigoProducto()).isEqualTo(DEFAULT_CODIGO_PRODUCTO);
        assertThat(testDetalleFactura.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createDetalleFacturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleFacturaRepository.findAll().size();

        // Create the DetalleFactura with an existing ID
        detalleFactura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleFacturaMockMvc.perform(post("/api/detalle-facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleFactura)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        List<DetalleFactura> detalleFacturaList = detalleFacturaRepository.findAll();
        assertThat(detalleFacturaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDetalleFacturas() throws Exception {
        // Initialize the database
        detalleFacturaRepository.saveAndFlush(detalleFactura);

        // Get all the detalleFacturaList
        restDetalleFacturaMockMvc.perform(get("/api/detalle-facturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleFactura.getId().intValue())))
            .andExpect(jsonPath("$.[*].producto").value(hasItem(DEFAULT_PRODUCTO)))
            .andExpect(jsonPath("$.[*].codigoProducto").value(hasItem(DEFAULT_CODIGO_PRODUCTO)))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }
    
    @Test
    @Transactional
    public void getDetalleFactura() throws Exception {
        // Initialize the database
        detalleFacturaRepository.saveAndFlush(detalleFactura);

        // Get the detalleFactura
        restDetalleFacturaMockMvc.perform(get("/api/detalle-facturas/{id}", detalleFactura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detalleFactura.getId().intValue()))
            .andExpect(jsonPath("$.producto").value(DEFAULT_PRODUCTO))
            .andExpect(jsonPath("$.codigoProducto").value(DEFAULT_CODIGO_PRODUCTO))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleFactura() throws Exception {
        // Get the detalleFactura
        restDetalleFacturaMockMvc.perform(get("/api/detalle-facturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleFactura() throws Exception {
        // Initialize the database
        detalleFacturaRepository.saveAndFlush(detalleFactura);

        int databaseSizeBeforeUpdate = detalleFacturaRepository.findAll().size();

        // Update the detalleFactura
        DetalleFactura updatedDetalleFactura = detalleFacturaRepository.findById(detalleFactura.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleFactura are not directly saved in db
        em.detach(updatedDetalleFactura);
        updatedDetalleFactura
            .producto(UPDATED_PRODUCTO)
            .codigoProducto(UPDATED_CODIGO_PRODUCTO)
            .cantidad(UPDATED_CANTIDAD);

        restDetalleFacturaMockMvc.perform(put("/api/detalle-facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleFactura)))
            .andExpect(status().isOk());

        // Validate the DetalleFactura in the database
        List<DetalleFactura> detalleFacturaList = detalleFacturaRepository.findAll();
        assertThat(detalleFacturaList).hasSize(databaseSizeBeforeUpdate);
        DetalleFactura testDetalleFactura = detalleFacturaList.get(detalleFacturaList.size() - 1);
        assertThat(testDetalleFactura.getProducto()).isEqualTo(UPDATED_PRODUCTO);
        assertThat(testDetalleFactura.getCodigoProducto()).isEqualTo(UPDATED_CODIGO_PRODUCTO);
        assertThat(testDetalleFactura.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleFactura() throws Exception {
        int databaseSizeBeforeUpdate = detalleFacturaRepository.findAll().size();

        // Create the DetalleFactura

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleFacturaMockMvc.perform(put("/api/detalle-facturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleFactura)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleFactura in the database
        List<DetalleFactura> detalleFacturaList = detalleFacturaRepository.findAll();
        assertThat(detalleFacturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleFactura() throws Exception {
        // Initialize the database
        detalleFacturaRepository.saveAndFlush(detalleFactura);

        int databaseSizeBeforeDelete = detalleFacturaRepository.findAll().size();

        // Delete the detalleFactura
        restDetalleFacturaMockMvc.perform(delete("/api/detalle-facturas/{id}", detalleFactura.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleFactura> detalleFacturaList = detalleFacturaRepository.findAll();
        assertThat(detalleFacturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
