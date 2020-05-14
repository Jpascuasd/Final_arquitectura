package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Movimiento;
import com.themakers.storeonline.repository.MovimientoRepository;

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

import com.themakers.storeonline.domain.enumeration.TipoMovimiento;
/**
 * Integration tests for the {@link MovimientoResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MovimientoResourceIT {

    private static final TipoMovimiento DEFAULT_TIPO = TipoMovimiento.ENTRADA;
    private static final TipoMovimiento UPDATED_TIPO = TipoMovimiento.SALIDA;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_SUCURSAL = 1L;
    private static final Long UPDATED_SUCURSAL = 2L;

    private static final String DEFAULT_MOTIVO = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO = "BBBBBBBBBB";

    private static final String DEFAULT_OBSERVACION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACION = "BBBBBBBBBB";

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMovimientoMockMvc;

    private Movimiento movimiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .tipo(DEFAULT_TIPO)
            .fecha(DEFAULT_FECHA)
            .sucursal(DEFAULT_SUCURSAL)
            .motivo(DEFAULT_MOTIVO)
            .observacion(DEFAULT_OBSERVACION);
        return movimiento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Movimiento createUpdatedEntity(EntityManager em) {
        Movimiento movimiento = new Movimiento()
            .tipo(UPDATED_TIPO)
            .fecha(UPDATED_FECHA)
            .sucursal(UPDATED_SUCURSAL)
            .motivo(UPDATED_MOTIVO)
            .observacion(UPDATED_OBSERVACION);
        return movimiento;
    }

    @BeforeEach
    public void initTest() {
        movimiento = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovimiento() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // Create the Movimiento
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isCreated());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate + 1);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testMovimiento.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testMovimiento.getSucursal()).isEqualTo(DEFAULT_SUCURSAL);
        assertThat(testMovimiento.getMotivo()).isEqualTo(DEFAULT_MOTIVO);
        assertThat(testMovimiento.getObservacion()).isEqualTo(DEFAULT_OBSERVACION);
    }

    @Test
    @Transactional
    public void createMovimientoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movimientoRepository.findAll().size();

        // Create the Movimiento with an existing ID
        movimiento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovimientoMockMvc.perform(post("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMovimientos() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get all the movimientoList
        restMovimientoMockMvc.perform(get("/api/movimientos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movimiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].sucursal").value(hasItem(DEFAULT_SUCURSAL.intValue())))
            .andExpect(jsonPath("$.[*].motivo").value(hasItem(DEFAULT_MOTIVO)))
            .andExpect(jsonPath("$.[*].observacion").value(hasItem(DEFAULT_OBSERVACION)));
    }
    
    @Test
    @Transactional
    public void getMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", movimiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(movimiento.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.sucursal").value(DEFAULT_SUCURSAL.intValue()))
            .andExpect(jsonPath("$.motivo").value(DEFAULT_MOTIVO))
            .andExpect(jsonPath("$.observacion").value(DEFAULT_OBSERVACION));
    }

    @Test
    @Transactional
    public void getNonExistingMovimiento() throws Exception {
        // Get the movimiento
        restMovimientoMockMvc.perform(get("/api/movimientos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Update the movimiento
        Movimiento updatedMovimiento = movimientoRepository.findById(movimiento.getId()).get();
        // Disconnect from session so that the updates on updatedMovimiento are not directly saved in db
        em.detach(updatedMovimiento);
        updatedMovimiento
            .tipo(UPDATED_TIPO)
            .fecha(UPDATED_FECHA)
            .sucursal(UPDATED_SUCURSAL)
            .motivo(UPDATED_MOTIVO)
            .observacion(UPDATED_OBSERVACION);

        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovimiento)))
            .andExpect(status().isOk());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
        Movimiento testMovimiento = movimientoList.get(movimientoList.size() - 1);
        assertThat(testMovimiento.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testMovimiento.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testMovimiento.getSucursal()).isEqualTo(UPDATED_SUCURSAL);
        assertThat(testMovimiento.getMotivo()).isEqualTo(UPDATED_MOTIVO);
        assertThat(testMovimiento.getObservacion()).isEqualTo(UPDATED_OBSERVACION);
    }

    @Test
    @Transactional
    public void updateNonExistingMovimiento() throws Exception {
        int databaseSizeBeforeUpdate = movimientoRepository.findAll().size();

        // Create the Movimiento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovimientoMockMvc.perform(put("/api/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(movimiento)))
            .andExpect(status().isBadRequest());

        // Validate the Movimiento in the database
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovimiento() throws Exception {
        // Initialize the database
        movimientoRepository.saveAndFlush(movimiento);

        int databaseSizeBeforeDelete = movimientoRepository.findAll().size();

        // Delete the movimiento
        restMovimientoMockMvc.perform(delete("/api/movimientos/{id}", movimiento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Movimiento> movimientoList = movimientoRepository.findAll();
        assertThat(movimientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
