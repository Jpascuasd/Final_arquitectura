package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.TipoTalla;
import com.themakers.storeonline.repository.TipoTallaRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.TipoTalla}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoTallaResource {

    private final Logger log = LoggerFactory.getLogger(TipoTallaResource.class);

    private static final String ENTITY_NAME = "tipoTalla";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoTallaRepository tipoTallaRepository;

    public TipoTallaResource(TipoTallaRepository tipoTallaRepository) {
        this.tipoTallaRepository = tipoTallaRepository;
    }

    /**
     * {@code POST  /tipo-tallas} : Create a new tipoTalla.
     *
     * @param tipoTalla the tipoTalla to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoTalla, or with status {@code 400 (Bad Request)} if the tipoTalla has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-tallas")
    public ResponseEntity<TipoTalla> createTipoTalla(@RequestBody TipoTalla tipoTalla) throws URISyntaxException {
        log.debug("REST request to save TipoTalla : {}", tipoTalla);
        if (tipoTalla.getId() != null) {
            throw new BadRequestAlertException("A new tipoTalla cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoTalla result = tipoTallaRepository.save(tipoTalla);
        return ResponseEntity.created(new URI("/api/tipo-tallas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-tallas} : Updates an existing tipoTalla.
     *
     * @param tipoTalla the tipoTalla to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoTalla,
     * or with status {@code 400 (Bad Request)} if the tipoTalla is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoTalla couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-tallas")
    public ResponseEntity<TipoTalla> updateTipoTalla(@RequestBody TipoTalla tipoTalla) throws URISyntaxException {
        log.debug("REST request to update TipoTalla : {}", tipoTalla);
        if (tipoTalla.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoTalla result = tipoTallaRepository.save(tipoTalla);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoTalla.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-tallas} : get all the tipoTallas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoTallas in body.
     */
    @GetMapping("/tipo-tallas")
    public List<TipoTalla> getAllTipoTallas() {
        log.debug("REST request to get all TipoTallas");
        return tipoTallaRepository.findAll();
    }

    /**
     * {@code GET  /tipo-tallas/:id} : get the "id" tipoTalla.
     *
     * @param id the id of the tipoTalla to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoTalla, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-tallas/{id}")
    public ResponseEntity<TipoTalla> getTipoTalla(@PathVariable Long id) {
        log.debug("REST request to get TipoTalla : {}", id);
        Optional<TipoTalla> tipoTalla = tipoTallaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoTalla);
    }

    /**
     * {@code DELETE  /tipo-tallas/:id} : delete the "id" tipoTalla.
     *
     * @param id the id of the tipoTalla to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-tallas/{id}")
    public ResponseEntity<Void> deleteTipoTalla(@PathVariable Long id) {
        log.debug("REST request to delete TipoTalla : {}", id);
        tipoTallaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
