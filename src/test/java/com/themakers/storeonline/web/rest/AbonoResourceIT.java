package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Abono;
import com.themakers.storeonline.repository.AbonoRepository;

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

/**
 * Integration tests for the {@link AbonoResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class AbonoResourceIT {

    private static final Long DEFAULT_USUARIO = 1L;
    private static final Long UPDATED_USUARIO = 2L;

    private static final Instant DEFAULT_FECHA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_CANTIDAD_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_CANTIDAD_VALOR = new BigDecimal(2);

    @Autowired
    private AbonoRepository abonoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAbonoMockMvc;

    private Abono abono;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abono createEntity(EntityManager em) {
        Abono abono = new Abono()
            .usuario(DEFAULT_USUARIO)
            .fecha(DEFAULT_FECHA)
            .codigo(DEFAULT_CODIGO)
            .cantidadValor(DEFAULT_CANTIDAD_VALOR);
        return abono;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Abono createUpdatedEntity(EntityManager em) {
        Abono abono = new Abono()
            .usuario(UPDATED_USUARIO)
            .fecha(UPDATED_FECHA)
            .codigo(UPDATED_CODIGO)
            .cantidadValor(UPDATED_CANTIDAD_VALOR);
        return abono;
    }

    @BeforeEach
    public void initTest() {
        abono = createEntity(em);
    }

    @Test
    @Transactional
    public void createAbono() throws Exception {
        int databaseSizeBeforeCreate = abonoRepository.findAll().size();

        // Create the Abono
        restAbonoMockMvc.perform(post("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isCreated());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeCreate + 1);
        Abono testAbono = abonoList.get(abonoList.size() - 1);
        assertThat(testAbono.getUsuario()).isEqualTo(DEFAULT_USUARIO);
        assertThat(testAbono.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testAbono.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAbono.getCantidadValor()).isEqualTo(DEFAULT_CANTIDAD_VALOR);
    }

    @Test
    @Transactional
    public void createAbonoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = abonoRepository.findAll().size();

        // Create the Abono with an existing ID
        abono.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAbonoMockMvc.perform(post("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isBadRequest());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAbonos() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        // Get all the abonoList
        restAbonoMockMvc.perform(get("/api/abonos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(abono.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)))
            .andExpect(jsonPath("$.[*].cantidadValor").value(hasItem(DEFAULT_CANTIDAD_VALOR.intValue())));
    }
    
    @Test
    @Transactional
    public void getAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        // Get the abono
        restAbonoMockMvc.perform(get("/api/abonos/{id}", abono.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(abono.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO))
            .andExpect(jsonPath("$.cantidadValor").value(DEFAULT_CANTIDAD_VALOR.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAbono() throws Exception {
        // Get the abono
        restAbonoMockMvc.perform(get("/api/abonos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        int databaseSizeBeforeUpdate = abonoRepository.findAll().size();

        // Update the abono
        Abono updatedAbono = abonoRepository.findById(abono.getId()).get();
        // Disconnect from session so that the updates on updatedAbono are not directly saved in db
        em.detach(updatedAbono);
        updatedAbono
            .usuario(UPDATED_USUARIO)
            .fecha(UPDATED_FECHA)
            .codigo(UPDATED_CODIGO)
            .cantidadValor(UPDATED_CANTIDAD_VALOR);

        restAbonoMockMvc.perform(put("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAbono)))
            .andExpect(status().isOk());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeUpdate);
        Abono testAbono = abonoList.get(abonoList.size() - 1);
        assertThat(testAbono.getUsuario()).isEqualTo(UPDATED_USUARIO);
        assertThat(testAbono.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testAbono.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAbono.getCantidadValor()).isEqualTo(UPDATED_CANTIDAD_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingAbono() throws Exception {
        int databaseSizeBeforeUpdate = abonoRepository.findAll().size();

        // Create the Abono

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAbonoMockMvc.perform(put("/api/abonos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(abono)))
            .andExpect(status().isBadRequest());

        // Validate the Abono in the database
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAbono() throws Exception {
        // Initialize the database
        abonoRepository.saveAndFlush(abono);

        int databaseSizeBeforeDelete = abonoRepository.findAll().size();

        // Delete the abono
        restAbonoMockMvc.perform(delete("/api/abonos/{id}", abono.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Abono> abonoList = abonoRepository.findAll();
        assertThat(abonoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
