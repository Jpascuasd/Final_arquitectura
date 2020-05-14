package com.themakers.storeonline.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.themakers.storeonline.web.rest.TestUtil;

public class ListaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lista.class);
        Lista lista1 = new Lista();
        lista1.setId(1L);
        Lista lista2 = new Lista();
        lista2.setId(lista1.getId());
        assertThat(lista1).isEqualTo(lista2);
        lista2.setId(2L);
        assertThat(lista1).isNotEqualTo(lista2);
        lista1.setId(null);
        assertThat(lista1).isNotEqualTo(lista2);
    }
}
