package com.example.budget.repository;
import com.example.budget.entity.BudgetItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<BudgetItem, Long> {
    Long id(Long id);
}
