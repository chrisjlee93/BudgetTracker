import { render, screen} from "@testing-library/react"
import {it, expect, describe, beforeEach} from "vitest";
import '@testing-library/jest-dom'
import {userEvent} from "@testing-library/user-event";
import Budget from "../Budget.tsx";
import * as budgetService from '../Budget-service.ts'
import BudgetTotal from "../BudgetTotal.tsx";
import {BudgetItem} from "../../types.ts";


describe('Budget Total', () => {

    // beforeEach(() => {
    //     render(
    // })

it('should see the total budget and how much is already allocated', async () => {

    const data = [
        { id: 1, category: 'Total', amount: '1000', created: '', percentage: ''},
        { id: 2, category: 'Rent', amount: '500', created: '', percentage: ''},
        { id: 3, category: 'Groceries', amount: '100', created: '', percentage: ''}
    ]

    let subtotal = 0;
    for ( const d of data)
        if (d.id !== 1) {
            subtotal += Number(d.amount)
        }



    vi.spyOn(budgetService, 'fetchBudgetItems').mockResolvedValue(data)

    render(<BudgetTotal totalBudget={data[0].amount} items={data}/>)

    expect(await screen.findByText(/Total Budget/i)).toBeVisible()
    expect(await screen.findByText(/1000/i)).toBeVisible()
    // expect(await screen.findByText('Budget Allocated: ' + `${subtotal}`))



})

})