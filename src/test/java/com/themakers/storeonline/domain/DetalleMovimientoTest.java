package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class DetalleMovimientoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleMovimiento.class);
        DetalleMovimiento detalleMovimiento1 = new DetalleMovimiento();
        detalleMovimiento1.setId(1L);
        DetalleMovimiento detalleMovimiento2 = new DetalleMovimiento();
        detalleMovimiento2.setId(detalleMovimiento1.getId());
        assertThat(detalleMovimiento1).isEqualTo(detalleMovimiento2);
        detalleMovimiento2.setId(2L);
        assertThat(detalleMovimiento1).isNotEqualTo(detalleMovimiento2);
        detalleMovimiento1.setId(null);
        assertThat(detalleMovimiento1).isNotEqualTo(detalleMovimiento2);
    }
}
