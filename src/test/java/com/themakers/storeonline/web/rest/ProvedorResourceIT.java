package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Provedor;
import com.themakers.storeonline.repository.ProvedorRepository;

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
 * Integration tests for the {@link ProvedorResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProvedorResourceIT {

    private static final Integer DEFAULT_CODIGO = 1;
    private static final Integer UPDATED_CODIGO = 2;

    @Autowired
    private ProvedorRepository provedorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProvedorMockMvc;

    private Provedor provedor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provedor createEntity(EntityManager em) {
        Provedor provedor = new Provedor()
            .codigo(DEFAULT_CODIGO);
        return provedor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Provedor createUpdatedEntity(EntityManager em) {
        Provedor provedor = new Provedor()
            .codigo(UPDATED_CODIGO);
        return provedor;
    }

    @BeforeEach
    public void initTest() {
        provedor = createEntity(em);
    }

    @Test
    @Transactional
    public void createProvedor() throws Exception {
        int databaseSizeBeforeCreate = provedorRepository.findAll().size();

        // Create the Provedor
        restProvedorMockMvc.perform(post("/api/provedors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provedor)))
            .andExpect(status().isCreated());

        // Validate the Provedor in the database
        List<Provedor> provedorList = provedorRepository.findAll();
        assertThat(provedorList).hasSize(databaseSizeBeforeCreate + 1);
        Provedor testProvedor = provedorList.get(provedorList.size() - 1);
        assertThat(testProvedor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createProvedorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = provedorRepository.findAll().size();

        // Create the Provedor with an existing ID
        provedor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProvedorMockMvc.perform(post("/api/provedors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provedor)))
            .andExpect(status().isBadRequest());

        // Validate the Provedor in the database
        List<Provedor> provedorList = provedorRepository.findAll();
        assertThat(provedorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProvedors() throws Exception {
        // Initialize the database
        provedorRepository.saveAndFlush(provedor);

        // Get all the provedorList
        restProvedorMockMvc.perform(get("/api/provedors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(provedor.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @Test
    @Transactional
    public void getProvedor() throws Exception {
        // Initialize the database
        provedorRepository.saveAndFlush(provedor);

        // Get the provedor
        restProvedorMockMvc.perform(get("/api/provedors/{id}", provedor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(provedor.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    public void getNonExistingProvedor() throws Exception {
        // Get the provedor
        restProvedorMockMvc.perform(get("/api/provedors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProvedor() throws Exception {
        // Initialize the database
        provedorRepository.saveAndFlush(provedor);

        int databaseSizeBeforeUpdate = provedorRepository.findAll().size();

        // Update the provedor
        Provedor updatedProvedor = provedorRepository.findById(provedor.getId()).get();
        // Disconnect from session so that the updates on updatedProvedor are not directly saved in db
        em.detach(updatedProvedor);
        updatedProvedor
            .codigo(UPDATED_CODIGO);

        restProvedorMockMvc.perform(put("/api/provedors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProvedor)))
            .andExpect(status().isOk());

        // Validate the Provedor in the database
        List<Provedor> provedorList = provedorRepository.findAll();
        assertThat(provedorList).hasSize(databaseSizeBeforeUpdate);
        Provedor testProvedor = provedorList.get(provedorList.size() - 1);
        assertThat(testProvedor.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingProvedor() throws Exception {
        int databaseSizeBeforeUpdate = provedorRepository.findAll().size();

        // Create the Provedor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProvedorMockMvc.perform(put("/api/provedors")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(provedor)))
            .andExpect(status().isBadRequest());

        // Validate the Provedor in the database
        List<Provedor> provedorList = provedorRepository.findAll();
        assertThat(provedorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProvedor() throws Exception {
        // Initialize the database
        provedorRepository.saveAndFlush(provedor);

        int databaseSizeBeforeDelete = provedorRepository.findAll().size();

        // Delete the provedor
        restProvedorMockMvc.perform(delete("/api/provedors/{id}", provedor.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Provedor> provedorList = provedorRepository.findAll();
        assertThat(provedorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
