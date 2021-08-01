package csui.advpro2021.groupassignment.service;

import csui.advpro2021.groupassignment.entity.*;
import csui.advpro2021.groupassignment.repository.JakunRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class JakunServiceTest {

    @Mock
    private JakunRepository jakunRepository;

    @InjectMocks
    private JakunService jakunService;

    public static Jakun jakun = new Jakun();
    public static Jakun jakun1 = new Jakun();

    @Before("")
    public void init(){
        MockitoAnnotations.openMocks(this);
    }

    @BeforeAll
    public static void setUp(){
        jakun.setOwnerId("yowlie");
        jakun.setContact("rsc10");
        jakun.setDescription("yuk tuker heheh bosen aja mau yang baru");
        jakun.setCondition(Condition.UNTOUCHED);
        jakun.setFaculty(Faculty.FIA);
        jakun.setSize(Size.SPECIAL);

        jakun1.setOwnerId("owo");
        jakun1.setContact("rsc11");
        jakun1.setDescription("uwuwuwuowow");
        jakun1.setCondition(Condition.MODIFIED);
        jakun1.setFaculty(Faculty.FT);
        jakun1.setSize(Size.S);
    }

    @Test
    void addJakunTest(){
        jakunService.addJakun(jakun);
        verify(jakunRepository, times(1)).save(jakun);
    }

    @Test
    void getAllJakunTest(){
        jakunService.addJakun(jakun);
        jakunService.addJakun(jakun1);
        jakunService.getAllJakun();
        verify(jakunRepository, times(1)).findAll();
    }

    @Test
    void getJakunTest(){
        jakunService.addJakun(jakun);
        jakunService.addJakun(jakun1);
        jakunService.getJakun("owo");
        verify(jakunRepository, times(1)).findByOwnerId("owo");
    }

    @Test
    void findJakunTest(){
        jakunService.addJakun(jakun);
        jakunService.addJakun(jakun1);
        jakunService.findJakun("owo yowlie");
        verify(jakunRepository, times(1)).findAll();
    }

    @Test
    void addCommentTest(){
        Mockito.when(jakunRepository.findByOwnerId("yowlie")).thenReturn(jakun);
        List<String> list = jakunService.addComment("yowlie", "I like it");
        assertThat(list.get(0)).isEqualTo("I like it");
    }

}
