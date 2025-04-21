import { render, screen} from "@testing-library/react"
import { it, expect, describe } from "vitest";
import '@testing-library/jest-dom'
// import LandingPage from "../LandingPage.tsx";
// import {userEvent} from '@testing-library/user-event'
import Budget from "../Budget.tsx";
import {userEvent} from "@testing-library/user-event";
// import {MemoryRouter, Route, Routes} from "react-router-dom";
// import Budget from "../Budget.tsx";

describe('Budget Page', () =>{

    it('should see a form to input values for budgeting and display on submit', async () => {
        render(<Budget/>)

        const budgetInput = screen.getByRole('form')
        const budgetButton = screen.getByLabelText('submit button')
        const totalBudget = String(5000)

        expect( screen.getByPlaceholderText(/enter total budget/i)).toBeVisible()
        await userEvent.type(budgetInput,totalBudget);
        await userEvent.click(budgetButton)
        expect( screen.findByText(5000))
    })

})