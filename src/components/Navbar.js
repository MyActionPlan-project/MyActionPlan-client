import {NavLink} from "react-router-dom"


function Navbar(){

    return(
        <nav>
        <h2> Hello {} </h2>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/profile"> Profile </NavLink>
            <NavLink to="/signup"> Sign up </NavLink>
            <NavLink to="/login"> Login </NavLink>
            <NavLink to="/logout"> Logout </NavLink>
        </nav>

    )
}

export default Navbar;