package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.Talla;
import com.themakers.storeonline.repository.TallaRepository;
import com.themakers.storeonline.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.themakers.storeonline.domain.Talla}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TallaResource {

    private final Logger log = LoggerFactory.getLogger(TallaResource.class);

    private static final String ENTITY_NAME = "talla";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TallaRepository tallaRepository;

    public TallaResource(TallaRepository tallaRepository) {
        this.tallaRepository = tallaRepository;
    }

    /**
     * {@code POST  /tallas} : Create a new talla.
     *
     * @param talla the talla to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new talla, or with status {@code 400 (Bad Request)} if the talla has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tallas")
    public ResponseEntity<Talla> createTalla(@RequestBody Talla talla) throws URISyntaxException {
        log.debug("REST request to save Talla : {}", talla);
        if (talla.getId() != null) {
            throw new BadRequestAlertException("A new talla cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Talla result = tallaRepository.save(talla);
        return ResponseEntity.created(new URI("/api/tallas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tallas} : Updates an existing talla.
     *
     * @param talla the talla to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated talla,
     * or with status {@code 400 (Bad Request)} if the talla is not valid,
     * or with status {@code 500 (Internal Server Error)} if the talla couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tallas")
    public ResponseEntity<Talla> updateTalla(@RequestBody Talla talla) throws URISyntaxException {
        log.debug("REST request to update Talla : {}", talla);
        if (talla.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Talla result = tallaRepository.save(talla);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, talla.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tallas} : get all the tallas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tallas in body.
     */
    @GetMapping("/tallas")
    public List<Talla> getAllTallas() {
        log.debug("REST request to get all Tallas");
        return tallaRepository.findAll();
    }

    /**
     * {@code GET  /tallas/:id} : get the "id" talla.
     *
     * @param id the id of the talla to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the talla, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tallas/{id}")
    public ResponseEntity<Talla> getTalla(@PathVariable Long id) {
        log.debug("REST request to get Talla : {}", id);
        Optional<Talla> talla = tallaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(talla);
    }

    /**
     * {@code DELETE  /tallas/:id} : delete the "id" talla.
     *
     * @param id the id of the talla to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tallas/{id}")
    public ResponseEntity<Void> deleteTalla(@PathVariable Long id) {
        log.debug("REST request to delete Talla : {}", id);
        tallaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
