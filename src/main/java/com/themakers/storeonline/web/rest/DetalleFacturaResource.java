package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.DetalleFactura;
import com.themakers.storeonline.repository.DetalleFacturaRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.DetalleFactura}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DetalleFacturaResource {

    private final Logger log = LoggerFactory.getLogger(DetalleFacturaResource.class);

    private static final String ENTITY_NAME = "detalleFactura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleFacturaRepository detalleFacturaRepository;

    public DetalleFacturaResource(DetalleFacturaRepository detalleFacturaRepository) {
        this.detalleFacturaRepository = detalleFacturaRepository;
    }

    /**
     * {@code POST  /detalle-facturas} : Create a new detalleFactura.
     *
     * @param detalleFactura the detalleFactura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleFactura, or with status {@code 400 (Bad Request)} if the detalleFactura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-facturas")
    public ResponseEntity<DetalleFactura> createDetalleFactura(@RequestBody DetalleFactura detalleFactura) throws URISyntaxException {
        log.debug("REST request to save DetalleFactura : {}", detalleFactura);
        if (detalleFactura.getId() != null) {
            throw new BadRequestAlertException("A new detalleFactura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleFactura result = detalleFacturaRepository.save(detalleFactura);
        return ResponseEntity.created(new URI("/api/detalle-facturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-facturas} : Updates an existing detalleFactura.
     *
     * @param detalleFactura the detalleFactura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleFactura,
     * or with status {@code 400 (Bad Request)} if the detalleFactura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleFactura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-facturas")
    public ResponseEntity<DetalleFactura> updateDetalleFactura(@RequestBody DetalleFactura detalleFactura) throws URISyntaxException {
        log.debug("REST request to update DetalleFactura : {}", detalleFactura);
        if (detalleFactura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleFactura result = detalleFacturaRepository.save(detalleFactura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detalleFactura.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-facturas} : get all the detalleFacturas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleFacturas in body.
     */
    @GetMapping("/detalle-facturas")
    public List<DetalleFactura> getAllDetalleFacturas() {
        log.debug("REST request to get all DetalleFacturas");
        return detalleFacturaRepository.findAll();
    }

    /**
     * {@code GET  /detalle-facturas/:id} : get the "id" detalleFactura.
     *
     * @param id the id of the detalleFactura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleFactura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-facturas/{id}")
    public ResponseEntity<DetalleFactura> getDetalleFactura(@PathVariable Long id) {
        log.debug("REST request to get DetalleFactura : {}", id);
        Optional<DetalleFactura> detalleFactura = detalleFacturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleFactura);
    }

    /**
     * {@code DELETE  /detalle-facturas/:id} : delete the "id" detalleFactura.
     *
     * @param id the id of the detalleFactura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-facturas/{id}")
    public ResponseEntity<Void> deleteDetalleFactura(@PathVariable Long id) {
        log.debug("REST request to delete DetalleFactura : {}", id);
        detalleFacturaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
