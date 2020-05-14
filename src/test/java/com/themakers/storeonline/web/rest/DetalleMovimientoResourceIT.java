package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.DetalleMovimiento;
import com.themakers.storeonline.repository.DetalleMovimientoRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DetalleMovimientoResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class DetalleMovimientoResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Long DEFAULT_PRODUCTO = 1L;
    private static final Long UPDATED_PRODUCTO = 2L;

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private DetalleMovimientoRepository detalleMovimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetalleMovimientoMockMvc;

    private DetalleMovimiento detalleMovimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleMovimiento createEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE)
            .producto(DEFAULT_PRODUCTO)
            .cantidad(DEFAULT_CANTIDAD)
            .fecha(DEFAULT_FECHA);
        return detalleMovimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleMovimiento createUpdatedEntity(EntityManager em) {
        DetalleMovimiento detalleMovimiento = new DetalleMovimiento()
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .producto(UPDATED_PRODUCTO)
            .cantidad(UPDATED_CANTIDAD)
            .fecha(UPDATED_FECHA);
        return detalleMovimiento;
    }

    @BeforeEach
    public void initTest() {
        detalleMovimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleMovimiento() throws Exception {
        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento
        restDetalleMovimientoMockMvc.perform(post("/api/detalle-movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isCreated());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testDetalleMovimiento.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testDetalleMovimiento.getProducto()).isEqualTo(DEFAULT_PRODUCTO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testDetalleMovimiento.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createDetalleMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento with an existing ID
        detalleMovimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleMovimientoMockMvc.perform(post("/api/detalle-movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDetalleMovimientos() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get all the detalleMovimientoList
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleMovimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].producto").value(hasItem(DEFAULT_PRODUCTO.intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos/{id}", detalleMovimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detalleMovimiento.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.producto").value(DEFAULT_PRODUCTO.intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleMovimiento() throws Exception {
        // Get the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(get("/api/detalle-movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Update the detalleMovimiento
        DetalleMovimiento updatedDetalleMovimiento = detalleMovimientoRepository.findById(detalleMovimiento.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleMovimiento are not directly saved in db
        em.detach(updatedDetalleMovimiento);
        updatedDetalleMovimiento
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .producto(UPDATED_PRODUCTO)
            .cantidad(UPDATED_CANTIDAD)
            .fecha(UPDATED_FECHA);

        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleMovimiento)))
            .andExpect(status().isOk());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
        DetalleMovimiento testDetalleMovimiento = detalleMovimientoList.get(detalleMovimientoList.size() - 1);
        assertThat(testDetalleMovimiento.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testDetalleMovimiento.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testDetalleMovimiento.getProducto()).isEqualTo(UPDATED_PRODUCTO);
        assertThat(testDetalleMovimiento.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testDetalleMovimiento.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = detalleMovimientoRepository.findAll().size();

        // Create the DetalleMovimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleMovimientoMockMvc.perform(put("/api/detalle-movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(detalleMovimiento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleMovimiento in the database
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleMovimiento() throws Exception {
        // Initialize the database
        detalleMovimientoRepository.saveAndFlush(detalleMovimiento);

        int databaseSizeBeforeDelete = detalleMovimientoRepository.findAll().size();

        // Delete the detalleMovimiento
        restDetalleMovimientoMockMvc.perform(delete("/api/detalle-movimientos/{id}", detalleMovimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleMovimiento> detalleMovimientoList = detalleMovimientoRepository.findAll();
        assertThat(detalleMovimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
