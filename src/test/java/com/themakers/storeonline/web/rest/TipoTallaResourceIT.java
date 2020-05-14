package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.TipoTalla;
import com.themakers.storeonline.repository.TipoTallaRepository;

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
 * Integration tests for the {@link TipoTallaResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TipoTallaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoTallaRepository tipoTallaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoTallaMockMvc;

    private TipoTalla tipoTalla;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoTalla createEntity(EntityManager em) {
        TipoTalla tipoTalla = new TipoTalla()
            .nombre(DEFAULT_NOMBRE);
        return tipoTalla;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoTalla createUpdatedEntity(EntityManager em) {
        TipoTalla tipoTalla = new TipoTalla()
            .nombre(UPDATED_NOMBRE);
        return tipoTalla;
    }

    @BeforeEach
    public void initTest() {
        tipoTalla = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoTalla() throws Exception {
        int databaseSizeBeforeCreate = tipoTallaRepository.findAll().size();

        // Create the TipoTalla
        restTipoTallaMockMvc.perform(post("/api/tipo-tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoTalla)))
            .andExpect(status().isCreated());

        // Validate the TipoTalla in the database
        List<TipoTalla> tipoTallaList = tipoTallaRepository.findAll();
        assertThat(tipoTallaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoTalla testTipoTalla = tipoTallaList.get(tipoTallaList.size() - 1);
        assertThat(testTipoTalla.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTipoTallaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoTallaRepository.findAll().size();

        // Create the TipoTalla with an existing ID
        tipoTalla.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoTallaMockMvc.perform(post("/api/tipo-tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoTalla)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTalla in the database
        List<TipoTalla> tipoTallaList = tipoTallaRepository.findAll();
        assertThat(tipoTallaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoTallas() throws Exception {
        // Initialize the database
        tipoTallaRepository.saveAndFlush(tipoTalla);

        // Get all the tipoTallaList
        restTipoTallaMockMvc.perform(get("/api/tipo-tallas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoTalla.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTipoTalla() throws Exception {
        // Initialize the database
        tipoTallaRepository.saveAndFlush(tipoTalla);

        // Get the tipoTalla
        restTipoTallaMockMvc.perform(get("/api/tipo-tallas/{id}", tipoTalla.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoTalla.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingTipoTalla() throws Exception {
        // Get the tipoTalla
        restTipoTallaMockMvc.perform(get("/api/tipo-tallas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoTalla() throws Exception {
        // Initialize the database
        tipoTallaRepository.saveAndFlush(tipoTalla);

        int databaseSizeBeforeUpdate = tipoTallaRepository.findAll().size();

        // Update the tipoTalla
        TipoTalla updatedTipoTalla = tipoTallaRepository.findById(tipoTalla.getId()).get();
        // Disconnect from session so that the updates on updatedTipoTalla are not directly saved in db
        em.detach(updatedTipoTalla);
        updatedTipoTalla
            .nombre(UPDATED_NOMBRE);

        restTipoTallaMockMvc.perform(put("/api/tipo-tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoTalla)))
            .andExpect(status().isOk());

        // Validate the TipoTalla in the database
        List<TipoTalla> tipoTallaList = tipoTallaRepository.findAll();
        assertThat(tipoTallaList).hasSize(databaseSizeBeforeUpdate);
        TipoTalla testTipoTalla = tipoTallaList.get(tipoTallaList.size() - 1);
        assertThat(testTipoTalla.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoTalla() throws Exception {
        int databaseSizeBeforeUpdate = tipoTallaRepository.findAll().size();

        // Create the TipoTalla

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoTallaMockMvc.perform(put("/api/tipo-tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoTalla)))
            .andExpect(status().isBadRequest());

        // Validate the TipoTalla in the database
        List<TipoTalla> tipoTallaList = tipoTallaRepository.findAll();
        assertThat(tipoTallaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoTalla() throws Exception {
        // Initialize the database
        tipoTallaRepository.saveAndFlush(tipoTalla);

        int databaseSizeBeforeDelete = tipoTallaRepository.findAll().size();

        // Delete the tipoTalla
        restTipoTallaMockMvc.perform(delete("/api/tipo-tallas/{id}", tipoTalla.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoTalla> tipoTallaList = tipoTallaRepository.findAll();
        assertThat(tipoTallaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
