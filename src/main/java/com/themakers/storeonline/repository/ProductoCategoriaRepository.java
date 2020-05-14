package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.ProductoCategoria;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProductoCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoCategoriaRepository extends JpaRepository<ProductoCategoria, Long> {
}
