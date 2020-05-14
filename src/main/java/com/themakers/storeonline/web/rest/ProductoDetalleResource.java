package com.themakers.storeonline.web.rest;

import com.themakers.storeonline.domain.ProductoDetalle;
import com.themakers.storeonline.repository.ProductoDetalleRepository;
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
 * REST controller for managing {@link com.themakers.storeonline.domain.ProductoDetalle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductoDetalleResource {

    private final Logger log = LoggerFactory.getLogger(ProductoDetalleResource.class);

    private static final String ENTITY_NAME = "productoDetalle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoDetalleRepository productoDetalleRepository;

    public ProductoDetalleResource(ProductoDetalleRepository productoDetalleRepository) {
        this.productoDetalleRepository = productoDetalleRepository;
    }

    /**
     * {@code POST  /producto-detalles} : Create a new productoDetalle.
     *
     * @param productoDetalle the productoDetalle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoDetalle, or with status {@code 400 (Bad Request)} if the productoDetalle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-detalles")
    public ResponseEntity<ProductoDetalle> createProductoDetalle(@RequestBody ProductoDetalle productoDetalle) throws URISyntaxException {
        log.debug("REST request to save ProductoDetalle : {}", productoDetalle);
        if (productoDetalle.getId() != null) {
            throw new BadRequestAlertException("A new productoDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoDetalle result = productoDetalleRepository.save(productoDetalle);
        return ResponseEntity.created(new URI("/api/producto-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-detalles} : Updates an existing productoDetalle.
     *
     * @param productoDetalle the productoDetalle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoDetalle,
     * or with status {@code 400 (Bad Request)} if the productoDetalle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoDetalle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-detalles")
    public ResponseEntity<ProductoDetalle> updateProductoDetalle(@RequestBody ProductoDetalle productoDetalle) throws URISyntaxException {
        log.debug("REST request to update ProductoDetalle : {}", productoDetalle);
        if (productoDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductoDetalle result = productoDetalleRepository.save(productoDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productoDetalle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /producto-detalles} : get all the productoDetalles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoDetalles in body.
     */
    @GetMapping("/producto-detalles")
    public List<ProductoDetalle> getAllProductoDetalles() {
        log.debug("REST request to get all ProductoDetalles");
        return productoDetalleRepository.findAll();
    }

    /**
     * {@code GET  /producto-detalles/:id} : get the "id" productoDetalle.
     *
     * @param id the id of the productoDetalle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoDetalle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-detalles/{id}")
    public ResponseEntity<ProductoDetalle> getProductoDetalle(@PathVariable Long id) {
        log.debug("REST request to get ProductoDetalle : {}", id);
        Optional<ProductoDetalle> productoDetalle = productoDetalleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productoDetalle);
    }

    /**
     * {@code DELETE  /producto-detalles/:id} : delete the "id" productoDetalle.
     *
     * @param id the id of the productoDetalle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-detalles/{id}")
    public ResponseEntity<Void> deleteProductoDetalle(@PathVariable Long id) {
        log.debug("REST request to delete ProductoDetalle : {}", id);
        productoDetalleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
