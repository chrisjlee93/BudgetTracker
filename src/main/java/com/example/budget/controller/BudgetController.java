package com.example.budget.controller;

import com.example.budget.entity.BudgetItem;
import com.example.budget.service.BudgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController (BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<BudgetItem> createItem(@RequestBody BudgetItem item) {
        return new ResponseEntity<>(budgetService.createBudgetItem(item), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BudgetItem>> getAllItems() {
        return ResponseEntity.ok(budgetService.findAllItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetItem> getItemById(@PathVariable Long id) { return ResponseEntity.ok(budgetService.findItemById(id)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        budgetService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BudgetItem> updateItem(@PathVariable Long id, @RequestBody BudgetItem updatedItem) { return ResponseEntity.ok(budgetService.updateItem(id,updatedItem)); }



}
