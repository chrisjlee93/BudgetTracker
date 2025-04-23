package com.example.budget.controller;


import com.example.budget.entity.BudgetItem;
import com.example.budget.service.BudgetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;


import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
//import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BudgetController.class)
public class BudgetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private BudgetService budgetService;

    private BudgetItem item;

    @BeforeEach
    void setup() {
        item = new BudgetItem("Rent",1000.00);
        item.setId(1L);
    }

    @Test
    void shouldCreateBudgetItem() throws Exception {
        when(budgetService.createBudgetItem(any(BudgetItem.class))).thenReturn(item);
        mockMvc.perform(post("/api/budget")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.category").value("Rent"));
    }

    @Test
    void shouldGetAllItems() throws Exception {
        when(budgetService.findAllItems()).thenReturn(List.of(item));
        mockMvc.perform(get("/api/budget"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void shouldGetItemById() throws Exception {
        when(budgetService.findItemById(1L)).thenReturn(item);
        mockMvc.perform(get("/api/budget/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value("Rent"));
    }

    @Test
    void shouldDeleteItem() throws Exception {
        mockMvc.perform(delete("/api/budget/1"))
                .andExpect(status().isNoContent());
        verify(budgetService).deleteItem(1L);
    }

}
