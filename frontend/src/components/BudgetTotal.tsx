import {BudgetItem} from "../types.ts";

type budgetItems = {
    items: BudgetItem[]
    item: BudgetItem | null;
}

const BudgetTotal = ({item, items}: budgetItems) => {

    let combinedBudget:number = 0

    for (const item of items) {
        if (item.category !== 'Total') {
            combinedBudget += Number(item.amount)
        }
    }

    const handleBudget = () => {
        const budgetDiff = Number(item?.amount) - combinedBudget
        if (budgetDiff > 0)
            return (
                <p>Budget Remaining: ${budgetDiff} </p>)
        else if (budgetDiff === 0 )
            return <p>All of budget allocated</p>
        else
            return (
                <p>
                You are over budget by ${Math.abs(budgetDiff)}
                </p>
            )
    }
    
    return (
        <>
            <div className="my-20 flex-col items-center text-center">
                    <p> Total Budget: ${item?.amount} </p>
                    <p> Budget Allocated: ${combinedBudget} </p>
                    {handleBudget()}
            </div>
        </>
    )
}


export default BudgetTotal
