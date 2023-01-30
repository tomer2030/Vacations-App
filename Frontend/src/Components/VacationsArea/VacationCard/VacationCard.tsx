import { Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
	vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    // variable for verify admin
    const [verifyAdmin, setVerifyAdmin] = useState<Boolean>();

    // variable for verify user
    const [verifyUser, setVerifyUser] = useState<Boolean>();

    // variable for toggle (true and false if it's toggled and the correct string to put in the button)
    const [toggle, setToggle] = useState<boolean>(true);
    const navigate = useNavigate();

    // function for handle the follow click 
    async function handlerFollowClick(vacationId: number): Promise<void> {
        try {
            // true = "Following", false = "Not Following"

            // check if the user is following and sent to backend 
            toggle ? await vacationService.followNewVacation(vacationId) : await vacationService.unFollowVacation(vacationId);                
            
            // change the toggle
            setToggle(!toggle);
            
        } catch (err:any) {
            notifyService.error(err)
        }
    }

    useEffect(()=>{
        
        // check if currently there is an admin
        authService.verifyAdminAndUser(setVerifyAdmin, setVerifyUser);

        // check if the user already follow the vacation
        if(authStore.getState().user){
            const userId = authStore.getState().user?.userId;
            vacationService.getVacationsForUser(userId)
                .then(userVacations => {
                    if(userVacations.length === 0) setToggle(true);
                    for(let i = 0; i < userVacations.length; i++) {
                        if(userVacations[i].vacationId === props.vacation.vacationId) {
                            setToggle(false);
                            break;
                        }
                        else {
                            setToggle(true);
                        }
                    }
    
                }).catch(err => notifyService.error(err));
        }
            
        // Listen to any change in auth global state
        const unsubscribe = authStore.subscribe(()=>{
            // verifyAdminAndUser();
            authService.verifyAdminAndUser(setVerifyAdmin, setVerifyUser);
        });

        return () => {
            // unsubscribe
            unsubscribe();
        }
    },[]);

    async function deleteVacation(id: number): Promise<void> {
        try {
            await vacationService.deleteVacation(id);
            notifyService.success("successfully deleted");
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // edit route
    const editRoute = "/vacations/edit/" + props.vacation.vacationId;
    
    return (
        <div className="VacationCard Box">
            {verifyAdmin &&
                <>
                    <span className="ActionBox">
                        <NavLink to="#" onClick={() => deleteVacation(props.vacation.vacationId)}>❌</NavLink>
                        <NavLink to={editRoute}> 📝</NavLink> 
                    </span>
                </> 
            }
            {verifyUser && <span className="FollowBox">

                <Switch checked={!toggle} onChange={()=>handlerFollowClick(props.vacation.vacationId)}/>
                <span>{toggle && "Not Following  " || !toggle && "Following"}</span>
            </span>}
            <img src={appConfig.vacationImageUrl + props.vacation.imageName}/>
            <h3>{props.vacation.destination}</h3>
            <div>
                <span className="Bolding">Description: </span>{props.vacation.description}
                <br/>
                <span className="Bolding">From: </span>{props.vacation.startDate}
                <span className="Bolding"> ➡️ To: </span>{props.vacation.endDate}
                <br/>
                <span className="Bolding">Price: </span>{props.vacation.price}$
                <br/>
                <span className="Bolding">Followers Count: </span>{props.vacation.followersCount || 0}
            </div>
        </div>
    );
}

export default VacationCard;
