package com.example.budget.repository;
import com.example.budget.entity.BudgetItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<BudgetItems, Long> {
}
