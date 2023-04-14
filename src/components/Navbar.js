import { useContext } from "react";
import {NavLink} from "react-router-dom"
import { AuthContext } from "../context/auth.context";


function Navbar(){

    const {
        isLoggedIn,
        user,
        logOutUser
    } = useContext(AuthContext);
    
    return(
        <nav>
        <h2> Hello {user && user.name} </h2>
        
            
            <NavLink to="/"> Home </NavLink>



        {isLoggedIn && (
            <>
                <NavLink to='/actionplans'>Actionplans</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                
                <button onClick={logOutUser}>Logout</button>
                
            </>
        )}
            {!isLoggedIn && (
                <>
                 <NavLink to="/signup"> Sign up </NavLink>
                 <NavLink to="/login"> Login </NavLink>
                </>
                )}
            
            
        </nav>
    )
}

export default Navbar;