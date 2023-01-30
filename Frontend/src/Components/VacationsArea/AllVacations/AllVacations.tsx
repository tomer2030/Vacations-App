import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/vacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Spinner from "../Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./AllVacations.css";

function AllVacations(): JSX.Element {
    // state for vacations
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // state for pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        
        // get all vacations
        vacationService.getAllVacations()
            .then(v => setVacations(v))
            .catch(err => notifyService.error(err)); 

    },[]);

        // pagination:
        // calculate the end range
        const endOffset = itemOffset + 10;
        
        // make an array of all the vacations that will appear in the current page 
        const currentAllVacations = vacations.slice(itemOffset, endOffset);

        // calculate how many pages there is 
        const pageCount = Math.ceil(vacations.length / 10);

        // handle the page change and set the new value for the new page
        const handlePageClick = (event: any, page: number) => {
            
            setCurrentPage(page);
            const newOffset = ((page - 1) * 10) % vacations.length;
            setItemOffset(newOffset);
            
        };

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
		<h2>All Vacations</h2>

        <div>
            {currentAllVacations.length === 0 && <Spinner/>}
            {currentAllVacations.map(v => <VacationCard key={v.vacationId} vacation={v}/> )}
        </div>

        </div>
    );
}

export default AllVacations;
