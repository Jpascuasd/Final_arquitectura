package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.Lista;
import com.themakers.storeonline.repository.ListaRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.Lista}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ListaResource {

    private final Logger log = LoggerFactory.getLogger(ListaResource.class);

    private static final String ENTITY_NAME = "lista";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListaRepository listaRepository;

    public ListaResource(ListaRepository listaRepository) {
        this.listaRepository = listaRepository;
    }

    /**
     * {@code POST  /listas} : Create a new lista.
     *
     * @param lista the lista to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lista, or with status {@code 400 (Bad Request)} if the lista has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/listas")
    public ResponseEntity<Lista> createLista(@RequestBody Lista lista) throws URISyntaxException {
        log.debug("REST request to save Lista : {}", lista);
        if (lista.getId() != null) {
            throw new BadRequestAlertException("A new lista cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lista result = listaRepository.save(lista);
        return ResponseEntity.created(new URI("/api/listas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /listas} : Updates an existing lista.
     *
     * @param lista the lista to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lista,
     * or with status {@code 400 (Bad Request)} if the lista is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lista couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/listas")
    public ResponseEntity<Lista> updateLista(@RequestBody Lista lista) throws URISyntaxException {
        log.debug("REST request to update Lista : {}", lista);
        if (lista.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lista result = listaRepository.save(lista);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lista.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /listas} : get all the listas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listas in body.
     */
    @GetMapping("/listas")
    public List<Lista> getAllListas() {
        log.debug("REST request to get all Listas");
        return listaRepository.findAll();
    }

    /**
     * {@code GET  /listas/:id} : get the "id" lista.
     *
     * @param id the id of the lista to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lista, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/listas/{id}")
    public ResponseEntity<Lista> getLista(@PathVariable Long id) {
        log.debug("REST request to get Lista : {}", id);
        Optional<Lista> lista = listaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lista);
    }

    /**
     * {@code DELETE  /listas/:id} : delete the "id" lista.
     *
     * @param id the id of the lista to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/listas/{id}")
    public ResponseEntity<Void> deleteLista(@PathVariable Long id) {
        log.debug("REST request to delete Lista : {}", id);
        listaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
