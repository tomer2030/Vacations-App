import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import VacationModel from "../../../Models/vacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import "./UserVacations.css";

function UserVacations(): JSX.Element {

    // state for user vacations
    const [userVacation, setUserVacation] = useState<VacationModel[]>([]);

    // state for pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(()=>{
        
        // get user vacations
        if(authStore.getState().user){
            const userId = authStore.getState().user?.userId;
            vacationService.getVacationsForUser(userId)
                .then(v => setUserVacation(v))
                .catch(err => notifyService.error(err));

            // Listen if there is a change in the vacations followed by user
            const unsubscribe = vacationStore.subscribe(()=>{
                vacationService.getVacationsForUser(userId)
                    .then(v => setUserVacation(v))
                    .catch(err => notifyService.error(err));
            })

            return () => {
                unsubscribe();
            }
        } 
    },[]);

        // pagination:
        // calculate the end range
        const endOffset = itemOffset + 10;

        // make an array of all the vacations that will appear in the current page 
        const currentUserVacations = userVacation.slice(itemOffset, endOffset);

        // calculate how many pages there is
        const pageCount = Math.ceil(userVacation.length / 10);

        // handle the page change and set the new value for the new page
        const handlePageClick = (event: any, page: number) => {
            
            setCurrentPage(page);
            const newOffset = ((page - 1) * 10) % userVacation.length;
            setItemOffset(newOffset);
            
        };
    
        // if there is no more vacations in current page and the page isn't the first page, call the handlePageClick and go back one page
        if(currentUserVacations.length === 0 && currentPage !== 1) handlePageClick(null, currentPage-1)

    return (
        <div className="AllVacations">
        <div className="absolutePagination">
            <Pagination
                defaultPage={1}
                onChange={handlePageClick}
                count={pageCount}
                page={currentPage}
                showFirstButton
                showLastButton
                siblingCount={1}
                size={"large"}
            ></Pagination>
        </div>
			<h2>User Vacations</h2>

            <div>
                {currentUserVacations.length === 0 && <p>You don't have any vacation followed</p> }
                {currentUserVacations.map(v => <VacationCard key={v.vacationId} vacation={v}/> )}
            </div>

        </div>
    );
}

export default UserVacations;
