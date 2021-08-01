//package csui.advpro2021.groupassignment.controller;
//
//import csui.advpro2021.groupassignment.entity.Condition;
//import csui.advpro2021.groupassignment.entity.Faculty;
//import csui.advpro2021.groupassignment.entity.Jakun;
//import csui.advpro2021.groupassignment.entity.Size;
//import csui.advpro2021.groupassignment.repository.JakunRepository;
//import csui.advpro2021.groupassignment.repository.UserRepository;
//import csui.advpro2021.groupassignment.security.JwtUtil;
//import csui.advpro2021.groupassignment.security.UserDetailsServiceImpl;
//import csui.advpro2021.groupassignment.service.JakunService;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.RequestBuilder;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import java.util.List;
//
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(controllers = MainController.class)
//@TestInstance(TestInstance.Lifecycle.PER_CLASS) // So BeforeAll runs Per Class, not Per Method.
//class MainControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private UserDetailsServiceImpl userDetailsServiceImpl;
//
//    @MockBean
//    private AuthenticationManager authenticationManager;
//
//    @MockBean
//    private JwtUtil jwtUtil;
//
//    @MockBean
//    private JakunRepository jakunRepository;
//
//    @MockBean
//    private UserRepository userRepository;
//
//    @MockBean
//    private JakunService jakunService;
//
//    @MockBean
//    private Jakun jakun;
//
//    @BeforeAll
//    void setup(){
//        jakun = new Jakun();
//        jakun.setOwnerId("wishnu.hazmi");
//        jakun.setContact("rsc7");
//        jakun.setDescription("jadiii tu guys jakun yang aku ambil ternyata kekecilan huhu gimanadong, tuker yuu punya aku masih bagus ko wlau ada yg blong kena setrika bibi aku ktiduran xixi");
//        jakun.setCondition(Condition.UNTOUCHED);
//        jakun.setFaculty(Faculty.FASILKOM);
//        jakun.setSize(Size.S);
//        jakunService.addJakun(jakun);
//    }
//
//    @Test
//    void testRetrieveAllJakunAndItsAvailableShouldHTTPStatusOk() throws Exception {
//        when(jakunService.getAllJakun()).thenReturn(List.of(jakun));
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//            .get("/api/all-jakun")
//            .accept(MediaType.APPLICATION_JSON);
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isOk());
//    }
//
//
//    @Test
//    void testRetrieveAllJakunAndItsNotAvailableShouldHTTPStatusNotFound() throws Exception {
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//            .get("/api/all-jakun")
//            .accept(MediaType.APPLICATION_JSON);
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    void testFindJakunByOwnerFoundShouldHTTPStatusOK() throws Exception {
//        when(jakunService.getJakun(Mockito.anyString())).thenReturn(jakun);
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//            .get("/api/wishnu.hazmi")
//            .accept(MediaType.APPLICATION_JSON);
//
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isOk());
//    }
//
//    @Test
//    void testFindJakunByOwnerNotFoundShouldHTTPStatusNotFound() throws Exception {
//        when(jakunService.getJakun(Mockito.eq("wishnu.hazmi"))).thenReturn(jakun);
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//            .get("/api/wishnu.halow")
//            .accept(MediaType.APPLICATION_JSON);
//
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    void testUploadJakunWithCompleteFieldsShouldHTTPStatusOK() throws Exception {
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//        .post("/api/add-jakun")
//            .contentType(MediaType.APPLICATION_JSON_VALUE)
//            .content("    {\n" +
//                "        \"ownerId\": \"wishnu.hazmi\",\n" +
//                "        \"description\": \"jadiii tu guys jakun yang aku ambil ternyata kekecilan huhu gimanadong, tuker yuu punya aku masih bagus ko wlau ada yg blong kena setrika bibi aku ktiduran xixi\",\n" +
//                "        \"contact\": \"rsc7\",\n" +
//                "        \"faculty\": \"FASILKOM\",\n" +
//                "        \"size\": \"S\",\n" +
//                "        \"condition\": \"UNTOUCHED\"\n" +
//                "    }");
//
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isOk());
//    }
//
//    @Test
//    void testUploadJakunWithIncompleteFieldsShouldHTTPStatusBadRequest() throws Exception {
//        mockMvc.perform(
//            post("/api/add-jakun")
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content("    {\n" +
//                    "        \"ownerId\": \"wishnu.hazmi\",\n" +
//                    "        \"description\": \"jadiii tu guys jakun yang aku ambil ternyata kekecilan huhu gimanadong, tuker yuu punya aku masih bagus ko wlau ada yg blong kena setrika bibi aku ktiduran xixi\",\n" +
//                    "        \"contact\": \"rsc7\",\n" +
//                    "        \"faculty\": \"FASILKOM\",\n" +
//                    "        \"size\": \"S\",\n" +
//                    "    }")
//        )
//            .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void testUploadJakunWithWrongOptionFieldsShouldHTTPStatusBadRequest() throws Exception {
//        mockMvc.perform(
//            post("/api/add-jakun")
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .content("    {\n" +
//                    "        \"ownerId\": \"wishnu.hazmi\",\n" +
//                    "        \"description\": \"jadiii tu guys jakun yang aku ambil ternyata kekecilan huhu gimanadong, tuker yuu punya aku masih bagus ko wlau ada yg blong kena setrika bibi aku ktiduran xixi\",\n" +
//                    "        \"contact\": \"rsc7\",\n" +
//                    "        \"faculty\": \"FASILKOM\",\n" +
//                    "        \"size\": \"S\",\n" +
//                    "        \"condition\": \"Baru Kok\"\n" +
//                    "    }")
//        )
//            .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void testDeleteJakunByOwnerIdSuccess() throws Exception {
//        RequestBuilder requestBuilder = MockMvcRequestBuilders
//            .delete("/api/wishnu.halo");
//        mockMvc
//            .perform(requestBuilder)
//            .andExpect(status().isOk());
//    }
//
//}
//
