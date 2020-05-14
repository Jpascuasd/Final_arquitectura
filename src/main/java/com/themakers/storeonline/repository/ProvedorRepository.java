package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.Provedor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Provedor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvedorRepository extends JpaRepository<Provedor, Long> {
}
