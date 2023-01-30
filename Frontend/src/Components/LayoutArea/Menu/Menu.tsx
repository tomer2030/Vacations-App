import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import verifyLoggedIn from "../../../Utils/vrifyLoggedIn";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {

    // variable for verify admin
    const [verifyAdmin, setVerifyAdmin] = useState<Boolean>()
    const [verifyUser, setVerifyUser] = useState<Boolean>()
    
    useEffect(()=>{
        // check if currently there is an admin or user
        authService.verifyAdminAndUser(setVerifyAdmin, setVerifyUser);

        // Listen to any change in auth global state
        const unsubscribe = authStore.subscribe(()=>{
            authService.verifyAdminAndUser(setVerifyAdmin, setVerifyUser);
        });

        return () => {
            // unsubscribe
            unsubscribe();
        }
    },[]);

    return (
        <div className="Menu">
            <AuthMenu/>
            <MenuItem><NavLink to="/home" className="MenuNavLink">Home</NavLink></MenuItem>
            <MenuItem><NavLink to="/vacations/all" className="MenuNavLink">All Vacations</NavLink></MenuItem>
			
            {verifyAdmin && <>
                <MenuItem><NavLink to="/vacations/new" className="MenuNavLink">Add Vacation</NavLink></MenuItem>
                <MenuItem><NavLink to="/vacations/statistics" className="MenuNavLink">Statistics</NavLink></MenuItem>
            </>}
            
            {verifyUser && <>
                <MenuItem><NavLink to="/vacations/my-vacations" className="MenuNavLink">My Vacations</NavLink></MenuItem>
            </>}
        </div>
    );
}

export default Menu;
