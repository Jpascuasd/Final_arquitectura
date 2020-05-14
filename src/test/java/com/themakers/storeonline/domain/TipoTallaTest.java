package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class TipoTallaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoTalla.class);
        TipoTalla tipoTalla1 = new TipoTalla();
        tipoTalla1.setId(1L);
        TipoTalla tipoTalla2 = new TipoTalla();
        tipoTalla2.setId(tipoTalla1.getId());
        assertThat(tipoTalla1).isEqualTo(tipoTalla2);
        tipoTalla2.setId(2L);
        assertThat(tipoTalla1).isNotEqualTo(tipoTalla2);
        tipoTalla1.setId(null);
        assertThat(tipoTalla1).isNotEqualTo(tipoTalla2);
    }
}
