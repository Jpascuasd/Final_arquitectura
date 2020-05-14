package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.Talla;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Talla entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TallaRepository extends JpaRepository<Talla, Long> {
}
