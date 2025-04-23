package com.example.budget.service;

import com.example.budget.entity.BudgetItem;
import com.example.budget.repository.BudgetRepository;

import java.util.List;

public class BudgetService {

    private final BudgetRepository budgetRepository;

    public BudgetService(BudgetRepository budgetRepository) { this.budgetRepository = budgetRepository; }

    public BudgetItem createBudgetItem(BudgetItem item) { return budgetRepository.save(item); }

    public List<BudgetItem> findAllItems() { return budgetRepository.findAll(); }

    public BudgetItem findItemById(Long id)  { return budgetRepository.findById(id).get(); }

    public void deleteItem(Long id) { budgetRepository.deleteById(id); }

    public BudgetItem updateItem(Long id, BudgetItem updatedItem) {
        BudgetItem item = budgetRepository.findById(id).orElseThrow();
        item.setCategory(updatedItem.getCategory());
        item.setAmount(updatedItem.getAmount());
        return budgetRepository.save(item);
    }

}
