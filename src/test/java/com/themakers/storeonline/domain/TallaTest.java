package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class TallaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Talla.class);
        Talla talla1 = new Talla();
        talla1.setId(1L);
        Talla talla2 = new Talla();
        talla2.setId(talla1.getId());
        assertThat(talla1).isEqualTo(talla2);
        talla2.setId(2L);
        assertThat(talla1).isNotEqualTo(talla2);
        talla1.setId(null);
        assertThat(talla1).isNotEqualTo(talla2);
    }
}
