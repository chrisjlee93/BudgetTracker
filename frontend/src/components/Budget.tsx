import {useState} from "react";

const Budget = () => {

    const initialState = {
        // budget: '',
        category: '',
        budgetPercent: '',
    }


    const [formData, setFormData] = useState(initialState)
    const [budget, setBudget] = useState('')
    const {category, budgetPercent} = formData
    const [totalBudget, setTotalBudget] = useState('')
    const [categories,setCategories] = useState<{category:string; budgetPercent: string}[]>([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("in submit")
        if (budget) {
            setTotalBudget(budget)
            setBudget('')
        }
        }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        console.log("in submit2")
        if (category && budgetPercent) {
            setCategories([...categories, {category,budgetPercent}])
            setFormData(initialState)
        }
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
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type= 'number'
                        role={'form'}
                        placeholder={'Enter Total Budget'}
                        name={'budget'}
                        value={budget}
                        onChange={handleBudget}
                    />
                    <button type={"submit"} aria-label={'submit button'}>Confirm Total Budget</button>
                </div>
            </form>
            <form onSubmit={handleSubmit2}>
                <div>
                    <input
                        type= 'text'
                        role={'form'}
                        placeholder={'Category to Budget'}
                        name={'category'}
                        value={category}
                        onChange={handleChange}
                    />
                    <input
                        type= 'number'
                        role={'form'}
                        placeholder={'% of Total Budget'}
                        name={'budgetPercent'}
                        value={budgetPercent}
                        onChange={handleChange}
                    />
                    <button type={"submit"} aria-label={'category submit button'}>Confirm New Item Budget</button>
                </div>
            </form>
            <p>Total Budget: {totalBudget}</p>
            <ul>
                {categories.map((item, index) =>(
                    <li key = {index}>
                        {item.category} -  {String(parseFloat(totalBudget)*parseFloat(item.budgetPercent)/100)}
                        </li>
                    ))}
            </ul>
        </>
    )
}

export default Budget