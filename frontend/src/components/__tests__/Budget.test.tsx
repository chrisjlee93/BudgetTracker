import { render, screen} from "@testing-library/react"
import {it, expect, describe, beforeEach} from "vitest";
import '@testing-library/jest-dom'
// import LandingPage from "../LandingPage.tsx";
// import {userEvent} from '@testing-library/user-event'
import Budget from "../Budget.tsx";
import {userEvent} from "@testing-library/user-event";
// import {MemoryRouter, Route, Routes} from "react-router-dom";
// import Budget from "../Budget.tsx";

describe('Budget Page', () =>{



    beforeEach(() => {
        render(<Budget/>)
    })

    // const catInput = screen.getAllByRole('form')[0]
    // const category = 'Rent'
    // const budgetInput = screen.getByPlaceholderText(/enter total * /i)
    // const budgetButton = screen.getByLabelText('submit button')
    // const totalBudget = 5000
    // const catAmount = 10


    it('should see a form with input values for budgeting and display on submit', async () => {

        const budgetInput = screen.getByPlaceholderText(/enter total * /i)
        const budgetButton = screen.getByLabelText('submit button')
        const totalBudget = 5000

        expect( screen.getByPlaceholderText(/enter total budget/i)).toBeVisible()
        expect( screen.getByPlaceholderText(/of total*/i)).toBeVisible()
        await userEvent.type(budgetInput,String(totalBudget));
        await userEvent.click(budgetButton)
        expect( screen.findByText(String({totalBudget})))
    })

    it('should display budget for Item you input and submit', async () => {

        const catInput = screen.getAllByRole('form')[0]
        const category = 'Rent'
        const budgetInput = screen.getByPlaceholderText(/enter total * /i)
        const budgetButton = screen.getByLabelText('submit button')
        const totalBudget = 5000
        const catAmount = 10

        await userEvent.type(budgetInput,String(totalBudget));
        await userEvent.click(budgetButton)
        await userEvent.type(catInput,category)
        await userEvent.type(screen.getAllByRole('form')[1],String(catAmount))
        await userEvent.click(screen.getByLabelText(/category */i))

        expect (screen.findByText({category} + ' - ' + String(totalBudget*catAmount/100) ))
    })

    it('should not let set up more than 100% of Budget', async  () => {
        render(<Budget/>)

    })

})