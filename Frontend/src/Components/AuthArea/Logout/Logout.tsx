import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(()=>{

        // delete the token from redux
        authService.logout();

        notifyService.success("Bye Bye");

        navigate("/home");


    },[]);

    return null;
}

export default Logout;
