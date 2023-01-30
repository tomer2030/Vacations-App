import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

function verifyLoggedIn(): void {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!authStore.getState().token){
            notifyService.error("You are not logged in!");
            navigate("/login");
        }
    },[]);
}

export default verifyLoggedIn
