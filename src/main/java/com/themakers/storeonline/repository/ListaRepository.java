package com.themakers.storeonline.repository;

import com.themakers.storeonline.domain.Lista;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Lista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListaRepository extends JpaRepository<Lista, Long> {
}
