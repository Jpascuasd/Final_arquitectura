package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.Sucursal;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Sucursal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Long> {
}
