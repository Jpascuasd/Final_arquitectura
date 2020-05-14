package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.Movimiento;
import com.themakers.storeonline.repository.MovimientoRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.Movimiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MovimientoResource {

    private final Logger log = LoggerFactory.getLogger(MovimientoResource.class);

    private static final String ENTITY_NAME = "movimiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MovimientoRepository movimientoRepository;

    public MovimientoResource(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    /**
     * {@code POST  /movimientos} : Create a new movimiento.
     *
     * @param movimiento the movimiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new movimiento, or with status {@code 400 (Bad Request)} if the movimiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/movimientos")
    public ResponseEntity<Movimiento> createMovimiento(@RequestBody Movimiento movimiento) throws URISyntaxException {
        log.debug("REST request to save Movimiento : {}", movimiento);
        if (movimiento.getId() != null) {
            throw new BadRequestAlertException("A new movimiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Movimiento result = movimientoRepository.save(movimiento);
        return ResponseEntity.created(new URI("/api/movimientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /movimientos} : Updates an existing movimiento.
     *
     * @param movimiento the movimiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated movimiento,
     * or with status {@code 400 (Bad Request)} if the movimiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the movimiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/movimientos")
    public ResponseEntity<Movimiento> updateMovimiento(@RequestBody Movimiento movimiento) throws URISyntaxException {
        log.debug("REST request to update Movimiento : {}", movimiento);
        if (movimiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Movimiento result = movimientoRepository.save(movimiento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, movimiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /movimientos} : get all the movimientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of movimientos in body.
     */
    @GetMapping("/movimientos")
    public List<Movimiento> getAllMovimientos() {
        log.debug("REST request to get all Movimientos");
        return movimientoRepository.findAll();
    }

    /**
     * {@code GET  /movimientos/:id} : get the "id" movimiento.
     *
     * @param id the id of the movimiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the movimiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/movimientos/{id}")
    public ResponseEntity<Movimiento> getMovimiento(@PathVariable Long id) {
        log.debug("REST request to get Movimiento : {}", id);
        Optional<Movimiento> movimiento = movimientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(movimiento);
    }

    /**
     * {@code DELETE  /movimientos/:id} : delete the "id" movimiento.
     *
     * @param id the id of the movimiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/movimientos/{id}")
    public ResponseEntity<Void> deleteMovimiento(@PathVariable Long id) {
        log.debug("REST request to delete Movimiento : {}", id);
        movimientoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
