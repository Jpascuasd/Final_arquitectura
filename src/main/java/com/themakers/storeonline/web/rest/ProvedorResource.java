package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.Provedor;
import com.themakers.storeonline.repository.ProvedorRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.Provedor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProvedorResource {

    private final Logger log = LoggerFactory.getLogger(ProvedorResource.class);

    private static final String ENTITY_NAME = "provedor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProvedorRepository provedorRepository;

    public ProvedorResource(ProvedorRepository provedorRepository) {
        this.provedorRepository = provedorRepository;
    }

    /**
     * {@code POST  /provedors} : Create a new provedor.
     *
     * @param provedor the provedor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new provedor, or with status {@code 400 (Bad Request)} if the provedor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/provedors")
    public ResponseEntity<Provedor> createProvedor(@RequestBody Provedor provedor) throws URISyntaxException {
        log.debug("REST request to save Provedor : {}", provedor);
        if (provedor.getId() != null) {
            throw new BadRequestAlertException("A new provedor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Provedor result = provedorRepository.save(provedor);
        return ResponseEntity.created(new URI("/api/provedors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /provedors} : Updates an existing provedor.
     *
     * @param provedor the provedor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provedor,
     * or with status {@code 400 (Bad Request)} if the provedor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the provedor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/provedors")
    public ResponseEntity<Provedor> updateProvedor(@RequestBody Provedor provedor) throws URISyntaxException {
        log.debug("REST request to update Provedor : {}", provedor);
        if (provedor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Provedor result = provedorRepository.save(provedor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, provedor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /provedors} : get all the provedors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of provedors in body.
     */
    @GetMapping("/provedors")
    public List<Provedor> getAllProvedors() {
        log.debug("REST request to get all Provedors");
        return provedorRepository.findAll();
    }

    /**
     * {@code GET  /provedors/:id} : get the "id" provedor.
     *
     * @param id the id of the provedor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the provedor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/provedors/{id}")
    public ResponseEntity<Provedor> getProvedor(@PathVariable Long id) {
        log.debug("REST request to get Provedor : {}", id);
        Optional<Provedor> provedor = provedorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(provedor);
    }

    /**
     * {@code DELETE  /provedors/:id} : delete the "id" provedor.
     *
     * @param id the id of the provedor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/provedors/{id}")
    public ResponseEntity<Void> deleteProvedor(@PathVariable Long id) {
        log.debug("REST request to delete Provedor : {}", id);
        provedorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
