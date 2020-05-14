package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.FleastoreApp;
import com.themakers.storeonline.domain.Marca;
import com.themakers.storeonline.repository.MarcaRepository;

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
 * Integration tests for the {@link MarcaResource} REST controller.
 */
@SpringBootTest(classes = FleastoreApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class MarcaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMarcaMockMvc;

    private Marca marca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marca createEntity(EntityManager em) {
        Marca marca = new Marca()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION);
        return marca;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Marca createUpdatedEntity(EntityManager em) {
        Marca marca = new Marca()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);
        return marca;
    }

    @BeforeEach
    public void initTest() {
        marca = createEntity(em);
    }

    @Test
    @Transactional
    public void createMarca() throws Exception {
        int databaseSizeBeforeCreate = marcaRepository.findAll().size();

        // Create the Marca
        restMarcaMockMvc.perform(post("/api/marcas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isCreated());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeCreate + 1);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testMarca.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createMarcaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = marcaRepository.findAll().size();

        // Create the Marca with an existing ID
        marca.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMarcaMockMvc.perform(post("/api/marcas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMarcas() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        // Get all the marcaList
        restMarcaMockMvc.perform(get("/api/marcas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(marca.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)));
    }
    
    @Test
    @Transactional
    public void getMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        // Get the marca
        restMarcaMockMvc.perform(get("/api/marcas/{id}", marca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(marca.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION));
    }

    @Test
    @Transactional
    public void getNonExistingMarca() throws Exception {
        // Get the marca
        restMarcaMockMvc.perform(get("/api/marcas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();

        // Update the marca
        Marca updatedMarca = marcaRepository.findById(marca.getId()).get();
        // Disconnect from session so that the updates on updatedMarca are not directly saved in db
        em.detach(updatedMarca);
        updatedMarca
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION);

        restMarcaMockMvc.perform(put("/api/marcas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMarca)))
            .andExpect(status().isOk());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
        Marca testMarca = marcaList.get(marcaList.size() - 1);
        assertThat(testMarca.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testMarca.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingMarca() throws Exception {
        int databaseSizeBeforeUpdate = marcaRepository.findAll().size();

        // Create the Marca

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMarcaMockMvc.perform(put("/api/marcas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(marca)))
            .andExpect(status().isBadRequest());

        // Validate the Marca in the database
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMarca() throws Exception {
        // Initialize the database
        marcaRepository.saveAndFlush(marca);

        int databaseSizeBeforeDelete = marcaRepository.findAll().size();

        // Delete the marca
        restMarcaMockMvc.perform(delete("/api/marcas/{id}", marca.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Marca> marcaList = marcaRepository.findAll();
        assertThat(marcaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
