import {useEffect, useState} from "react";
import BudgetTable from "./BudgetTable.tsx";
import {BudgetItem} from "../types.ts";
import {createBudgetItem, fetchBudgetItemById, fetchBudgetItems, updateBudgetItem} from "./Budget-service.ts";
import BudgetTotal from "./BudgetTotal.tsx";

const Budget = () => {

    const initialState = {
        category: '',
        budgetAmount: '',
    }


    const [formData, setFormData] = useState(initialState)
    const [budget, setBudget] = useState('')
    const {category, budgetAmount} = formData
    const [item, setItem] = useState<BudgetItem | null>(null)
    const [budgetItems,setBudgetItems] = useState<BudgetItem[]>([])
    const [refresh, setRefresh] = useState(false);

    const fetchBudget = () => {
        fetchBudgetItems()
            .then(setBudgetItems)
            .catch(err => console.error("failed", err))
    }

    useEffect(() => {
        fetchBudgetItemById({id: 1}).then(setItem);
        fetchBudget()
    }, [refresh]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("in submit")
        if (budget) {
            let newItem:BudgetItem = {id: 1, amount: budget, percentage: '100', category: 'Total'}
            if (budgetItems) {
                try {
                await updateBudgetItem(newItem);
                setRefresh(prev => !prev)
                } catch (err) {
                    console.log("Failed", err)
                }
            }
            else if (!budgetItems) {
                try {
                    await createBudgetItem(newItem)
                    setRefresh(prev => !prev)
                } catch (err) {
                    console.log("Failed", err)
                }
            }
            setBudget('')
        }
        }

    const handleSubmit2 = async (e) => {
        e.preventDefault()
        console.log("in submit2")
        if (category && budgetAmount && Number(budgetAmount)>0) {
            // you can omit a prop to let the backend handle it
            let newItem: Omit<BudgetItem, 'id'> = {category, amount: budgetAmount, percentage: ''}
            try {
                await createBudgetItem(newItem);
                setFormData(initialState)
                setRefresh(!refresh)
            } catch (err) {
                console.log("Failed", err)
            }
        }
        else
            console.log("Invalid Values")
        }

    const handleBudget = (e) => {
        setBudget(e.target.value)
    }


    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData(
            {...formData,
                [e.target.name]:e.target.value})
    }



    return (
        <>
            <h1>budget page</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div >
                    <input
                        className="block py-2.5 px-0 w-full text-sm mb-2.5 text-gray-900 bg-transparent border-0 border-b-2 "
                        type= 'number'
                        role={'form'}
                        placeholder={'Enter Total Budget'}
                        name={'budget'}
                        value={budget}
                        onChange={handleBudget}
                    />
                    <button
                        className="py-2.5 px-5 me-2  my-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type={"submit"}
                        aria-label={'submit button'}
                    >Confirm Total Budget</button>
                </div>
            </form>
            <form onSubmit={handleSubmit2} className="max-w-md mx-auto">
                <div>
                    <input
                        className="block py-2.5 px-0 mb-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2"
                        type= 'text'
                        role={'form'}
                        placeholder={'Category to Budget'}
                        name={'category'}
                        value={category}
                        onChange={handleChange}
                    />
                    <input
                        className="block py-2.5 px-0 mb-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 "
                        type= 'number'
                        role={'form'}
                        placeholder={'Amount to Budget'}
                        name={'budgetAmount'}
                        value={budgetAmount}
                        onChange={handleChange}
                    />
                    <button
                        className="py-2.5 px-5 me-2  my-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type={"submit"}
                        aria-label={'category submit button'}
                    >Confirm New Item Budget</button>
                </div>
            </form>


            {budgetItems.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <BudgetTotal
                        items={budgetItems}
                        item={item}
                    />
                    <BudgetTable
                        items={budgetItems}
                        onDeleteSuccess={() => setRefresh(prev => !prev)}
                        item={item}
                    />
                </>
            )}
        </>
    )
}

export default Budget