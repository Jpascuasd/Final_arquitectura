package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.TipoTalla;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoTalla entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoTallaRepository extends JpaRepository<TipoTalla, Long> {
}
