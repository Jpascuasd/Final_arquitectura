package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Talla;
import com.themakers.storeonline.repository.TallaRepository;

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
 * Integration tests for the {@link TallaResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class TallaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TallaRepository tallaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTallaMockMvc;

    private Talla talla;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Talla createEntity(EntityManager em) {
        Talla talla = new Talla()
            .nombre(DEFAULT_NOMBRE);
        return talla;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Talla createUpdatedEntity(EntityManager em) {
        Talla talla = new Talla()
            .nombre(UPDATED_NOMBRE);
        return talla;
    }

    @BeforeEach
    public void initTest() {
        talla = createEntity(em);
    }

    @Test
    @Transactional
    public void createTalla() throws Exception {
        int databaseSizeBeforeCreate = tallaRepository.findAll().size();

        // Create the Talla
        restTallaMockMvc.perform(post("/api/tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(talla)))
            .andExpect(status().isCreated());

        // Validate the Talla in the database
        List<Talla> tallaList = tallaRepository.findAll();
        assertThat(tallaList).hasSize(databaseSizeBeforeCreate + 1);
        Talla testTalla = tallaList.get(tallaList.size() - 1);
        assertThat(testTalla.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTallaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tallaRepository.findAll().size();

        // Create the Talla with an existing ID
        talla.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTallaMockMvc.perform(post("/api/tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(talla)))
            .andExpect(status().isBadRequest());

        // Validate the Talla in the database
        List<Talla> tallaList = tallaRepository.findAll();
        assertThat(tallaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTallas() throws Exception {
        // Initialize the database
        tallaRepository.saveAndFlush(talla);

        // Get all the tallaList
        restTallaMockMvc.perform(get("/api/tallas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(talla.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTalla() throws Exception {
        // Initialize the database
        tallaRepository.saveAndFlush(talla);

        // Get the talla
        restTallaMockMvc.perform(get("/api/tallas/{id}", talla.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(talla.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingTalla() throws Exception {
        // Get the talla
        restTallaMockMvc.perform(get("/api/tallas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTalla() throws Exception {
        // Initialize the database
        tallaRepository.saveAndFlush(talla);

        int databaseSizeBeforeUpdate = tallaRepository.findAll().size();

        // Update the talla
        Talla updatedTalla = tallaRepository.findById(talla.getId()).get();
        // Disconnect from session so that the updates on updatedTalla are not directly saved in db
        em.detach(updatedTalla);
        updatedTalla
            .nombre(UPDATED_NOMBRE);

        restTallaMockMvc.perform(put("/api/tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTalla)))
            .andExpect(status().isOk());

        // Validate the Talla in the database
        List<Talla> tallaList = tallaRepository.findAll();
        assertThat(tallaList).hasSize(databaseSizeBeforeUpdate);
        Talla testTalla = tallaList.get(tallaList.size() - 1);
        assertThat(testTalla.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTalla() throws Exception {
        int databaseSizeBeforeUpdate = tallaRepository.findAll().size();

        // Create the Talla

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTallaMockMvc.perform(put("/api/tallas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(talla)))
            .andExpect(status().isBadRequest());

        // Validate the Talla in the database
        List<Talla> tallaList = tallaRepository.findAll();
        assertThat(tallaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTalla() throws Exception {
        // Initialize the database
        tallaRepository.saveAndFlush(talla);

        int databaseSizeBeforeDelete = tallaRepository.findAll().size();

        // Delete the talla
        restTallaMockMvc.perform(delete("/api/tallas/{id}", talla.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Talla> tallaList = tallaRepository.findAll();
        assertThat(tallaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
