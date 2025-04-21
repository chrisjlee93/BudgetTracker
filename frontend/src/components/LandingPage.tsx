// moved all my other link components to the App.jsx to allow for routing tests on the landing page
import {Link} from "react-router-dom";


const LandingPage = () => {


    return (
        <>
                <h1>Welcome to your Budget Tracker</h1>
                <Link to="/budget" aria-label={"budget link"}> Budgeting Tool</Link>
        </>
    )
}

export default LandingPage