import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(()=>{
        // get user from authState
        setUser(authStore.getState().user);
        
        // define unsubscribe for stop the subscribing when the component will destroy
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        });

        return () => unsubscribe(); 
    
    },[]);

    return (
        <div className="AuthMenu">

            {!user && <>
            
                <span className="MenuSpan">Hello Guest</span>
                <MenuItem><NavLink to="/auth/login" className="MenuNavLink">Login</NavLink></MenuItem>
                <MenuItem><NavLink to="/auth/register" className="MenuNavLink">Register</NavLink></MenuItem>

            </>}

            {user && <>
            
    
                <span className="MenuSpan">Hello {user.firstName} {user.lastName}</span>
                <MenuItem><NavLink to="/auth/logout" className="MenuNavLink">Logout</NavLink></MenuItem>
                

            </>}

        </div>
    );
}

export default AuthMenu;
