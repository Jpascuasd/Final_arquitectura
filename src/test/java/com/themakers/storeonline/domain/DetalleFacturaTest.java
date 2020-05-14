package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class DetalleFacturaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleFactura.class);
        DetalleFactura detalleFactura1 = new DetalleFactura();
        detalleFactura1.setId(1L);
        DetalleFactura detalleFactura2 = new DetalleFactura();
        detalleFactura2.setId(detalleFactura1.getId());
        assertThat(detalleFactura1).isEqualTo(detalleFactura2);
        detalleFactura2.setId(2L);
        assertThat(detalleFactura1).isNotEqualTo(detalleFactura2);
        detalleFactura1.setId(null);
        assertThat(detalleFactura1).isNotEqualTo(detalleFactura2);
    }
}
