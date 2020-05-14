package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class RolTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rol.class);
        Rol rol1 = new Rol();
        rol1.setId(1L);
        Rol rol2 = new Rol();
        rol2.setId(rol1.getId());
        assertThat(rol1).isEqualTo(rol2);
        rol2.setId(2L);
        assertThat(rol1).isNotEqualTo(rol2);
        rol1.setId(null);
        assertThat(rol1).isNotEqualTo(rol2);
    }
}
