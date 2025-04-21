import {useState} from "react";

const Budget = () => {

    const [totalBudget, setTotalBudget] = useState(0)
    const [budget, setBudget] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("in submit")
        setTotalBudget(budget)
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setBudget(e.target.value)
    }

    return (
        <>
            <h1>budget page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type= 'number'
                    role={'form'}
                    placeholder={'Enter Total Budget'}
                    name={'totalBudget'}
                    value={budget}
                    onChange={handleChange}
                />
                <button type={"submit"} aria-label={'submit button'}>Submit</button>
            </form>
            {totalBudget}
        </>
    )
}

export default Budget