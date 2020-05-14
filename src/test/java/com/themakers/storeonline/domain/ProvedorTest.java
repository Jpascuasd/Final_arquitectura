package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class ProvedorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Provedor.class);
        Provedor provedor1 = new Provedor();
        provedor1.setId(1L);
        Provedor provedor2 = new Provedor();
        provedor2.setId(provedor1.getId());
        assertThat(provedor1).isEqualTo(provedor2);
        provedor2.setId(2L);
        assertThat(provedor1).isNotEqualTo(provedor2);
        provedor1.setId(null);
        assertThat(provedor1).isNotEqualTo(provedor2);
    }
}
