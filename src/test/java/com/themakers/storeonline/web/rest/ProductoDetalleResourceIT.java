package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.ProductoDetalle;
import com.themakers.storeonline.repository.ProductoDetalleRepository;

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
 * Integration tests for the {@link ProductoDetalleResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProductoDetalleResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private ProductoDetalleRepository productoDetalleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductoDetalleMockMvc;

    private ProductoDetalle productoDetalle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoDetalle createEntity(EntityManager em) {
        ProductoDetalle productoDetalle = new ProductoDetalle()
            .codigo(DEFAULT_CODIGO);
        return productoDetalle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoDetalle createUpdatedEntity(EntityManager em) {
        ProductoDetalle productoDetalle = new ProductoDetalle()
            .codigo(UPDATED_CODIGO);
        return productoDetalle;
    }

    @BeforeEach
    public void initTest() {
        productoDetalle = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductoDetalle() throws Exception {
        int databaseSizeBeforeCreate = productoDetalleRepository.findAll().size();

        // Create the ProductoDetalle
        restProductoDetalleMockMvc.perform(post("/api/producto-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoDetalle)))
            .andExpect(status().isCreated());

        // Validate the ProductoDetalle in the database
        List<ProductoDetalle> productoDetalleList = productoDetalleRepository.findAll();
        assertThat(productoDetalleList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoDetalle testProductoDetalle = productoDetalleList.get(productoDetalleList.size() - 1);
        assertThat(testProductoDetalle.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createProductoDetalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productoDetalleRepository.findAll().size();

        // Create the ProductoDetalle with an existing ID
        productoDetalle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoDetalleMockMvc.perform(post("/api/producto-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoDetalle in the database
        List<ProductoDetalle> productoDetalleList = productoDetalleRepository.findAll();
        assertThat(productoDetalleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProductoDetalles() throws Exception {
        // Initialize the database
        productoDetalleRepository.saveAndFlush(productoDetalle);

        // Get all the productoDetalleList
        restProductoDetalleMockMvc.perform(get("/api/producto-detalles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoDetalle.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @Test
    @Transactional
    public void getProductoDetalle() throws Exception {
        // Initialize the database
        productoDetalleRepository.saveAndFlush(productoDetalle);

        // Get the productoDetalle
        restProductoDetalleMockMvc.perform(get("/api/producto-detalles/{id}", productoDetalle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoDetalle.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    public void getNonExistingProductoDetalle() throws Exception {
        // Get the productoDetalle
        restProductoDetalleMockMvc.perform(get("/api/producto-detalles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductoDetalle() throws Exception {
        // Initialize the database
        productoDetalleRepository.saveAndFlush(productoDetalle);

        int databaseSizeBeforeUpdate = productoDetalleRepository.findAll().size();

        // Update the productoDetalle
        ProductoDetalle updatedProductoDetalle = productoDetalleRepository.findById(productoDetalle.getId()).get();
        // Disconnect from session so that the updates on updatedProductoDetalle are not directly saved in db
        em.detach(updatedProductoDetalle);
        updatedProductoDetalle
            .codigo(UPDATED_CODIGO);

        restProductoDetalleMockMvc.perform(put("/api/producto-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductoDetalle)))
            .andExpect(status().isOk());

        // Validate the ProductoDetalle in the database
        List<ProductoDetalle> productoDetalleList = productoDetalleRepository.findAll();
        assertThat(productoDetalleList).hasSize(databaseSizeBeforeUpdate);
        ProductoDetalle testProductoDetalle = productoDetalleList.get(productoDetalleList.size() - 1);
        assertThat(testProductoDetalle.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingProductoDetalle() throws Exception {
        int databaseSizeBeforeUpdate = productoDetalleRepository.findAll().size();

        // Create the ProductoDetalle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoDetalleMockMvc.perform(put("/api/producto-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoDetalle in the database
        List<ProductoDetalle> productoDetalleList = productoDetalleRepository.findAll();
        assertThat(productoDetalleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductoDetalle() throws Exception {
        // Initialize the database
        productoDetalleRepository.saveAndFlush(productoDetalle);

        int databaseSizeBeforeDelete = productoDetalleRepository.findAll().size();

        // Delete the productoDetalle
        restProductoDetalleMockMvc.perform(delete("/api/producto-detalles/{id}", productoDetalle.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoDetalle> productoDetalleList = productoDetalleRepository.findAll();
        assertThat(productoDetalleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
