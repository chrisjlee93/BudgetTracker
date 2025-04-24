import { render, screen} from "@testing-library/react"
import { it, expect, describe } from "vitest";
import '@testing-library/jest-dom'
import LandingPage from "../LandingPage.tsx";
import {userEvent} from '@testing-library/user-event'
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Budget from "../Budget.tsx";

describe('Landing Page', () => {

    it('should display landing page title', async () => {
            render(
            <MemoryRouter>
                <LandingPage/>
            </MemoryRouter>
            )
            expect( screen.getByRole("heading", { name: /budget/i })).toBeVisible()
    })

    // Moved my links into the App.tsx so this test is irrelevant
    // it("should navigate to the Budget page when link is clicked", async () => {
    //     render(
    //         <MemoryRouter initialEntries={["/"]}>
    //             <Routes>
    //                 <Route path="/" element={<LandingPage />} />
    //                 <Route path="/budget" element={<Budget />} />
    //             </Routes>
    //         </MemoryRouter>
    //     );
    //     await userEvent.click(screen.getByLabelText(/budget/i))
    //     expect( screen.getByRole("heading", { name: /budget page/i })).toBeVisible()
    // })
})

