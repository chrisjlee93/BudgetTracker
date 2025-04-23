package com.example.budget.service;

import com.example.budget.entity.BudgetItem;
import com.example.budget.repository.BudgetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class BudgetServiceTest {

    @Mock
    private BudgetRepository budgetRepository;

    @InjectMocks
    private BudgetService budgetService;

    BudgetItem item;
    BudgetItem item2;
    List<BudgetItem> items;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        item = new BudgetItem("Rent",2500.00);
        item.setId(1L);
        item2 = new BudgetItem("Pet",500.00);
        items = new ArrayList<>(List.of(item,item2));

    }

    @Test
    void shouldCreateNewBudgetItem() {
        when(budgetRepository.save(item)).thenReturn(item);
        BudgetItem saved = budgetService.createBudgetItem(item);
        assertThat(saved.getCategory()).isEqualTo("Rent");
        verify(budgetRepository).save(item);
    }

    @Test
    void shouldFindAllBudgetItems() {
        when(budgetRepository.findAll()).thenReturn(items);
        List<BudgetItem> req = budgetService.findAllItems();
        verify(budgetRepository, times(1)).findAll();
        assertThat(req).isEqualTo(items);
    }

    @Test
    void shouldFindBudgetItemById() {
        when(budgetRepository.findById(1L)).thenReturn(Optional.of(item));
        BudgetItem result = budgetService.findItemById(1L);
        assertThat(result).isEqualTo(item);
    }

    @Test
    void shouldDeleteItem() {
        budgetService.deleteItem(1L);
        verify(budgetRepository).deleteById(1L);
    }

    @Test
    void caUpdateItem() {
        BudgetItem updated = new BudgetItem("Rent",2000.00);
        when(budgetRepository.findById(1L)).thenReturn(Optional.of(item));
        when(budgetRepository.save(any(BudgetItem.class))).thenReturn(updated);
        BudgetItem result = budgetService.updateItem(1L, updated);
        assertThat(result.getAmount()).isEqualTo(2000.00);
    }

}
