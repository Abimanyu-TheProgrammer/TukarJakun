package csui.advpro2021.groupassignment.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JakunTest {

    @Test
    void testIfJakunHasCorrectAttributesValuesWhenCreated(){
        Jakun j = new Jakun();
        j.setCondition(Condition.UNTOUCHED);
        j.setSize(Size.L);
        j.setContact("JenkyTheMan");
        j.setOwnerId("jen.ky");
        j.setDescription("It's ugly");
        j.setFaculty(Faculty.FIA);

        assertEquals(Condition.UNTOUCHED, j.getCondition());
        assertEquals("JenkyTheMan", j.getContact());
        assertEquals(Size.L, j.getSize());
        assertEquals("jen.ky", j.getOwnerId());
        assertEquals("It's ugly", j.getDescription());
        assertEquals(Faculty.FIA, j.getFaculty());

    }

}
