import axios from "axios";
import FollowStatisticsModel from "../Models/FollowStatisticsModel";
import VacationModel from "../Models/vacationModel";
import { VacationsActionType, vacationStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";

class VacationService {

    // internal function for care the date format
    private dateFormat(vacation: VacationModel): VacationModel {
        vacation.startDate = new Date(vacation.startDate).toLocaleDateString();
        vacation.endDate = new Date(vacation.endDate).toLocaleDateString();
        return vacation;
    }

    // get all vacations
    public async getAllVacations(): Promise<VacationModel[]>{
        
        // take the vacations from global state
        let vacations = vacationStore.getState().vacations;
        
        // if there is no vacations in global state, we need to do AJAX request
        if (vacations.length === 0) {

            // AJAX request
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
            vacations = response.data;

            vacations.forEach(v => v = this.dateFormat(v));

            // save vacations in global state
            vacationStore.dispatch({type: VacationsActionType.GetAllVacations, payload: vacations});
        }
        return vacations;
    }

    // get one vacation
    public async getOneVacation(vacationId: number): Promise<VacationModel>{

        // AJAX request
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }

    // function for receive all the vacations that followed by the user
    public async getVacationsForUser(userId: number): Promise<VacationModel[]>{

        // AJAX request
        const response = await axios.get<VacationModel[]>(appConfig.allVacationsForUserUrl + userId);
        const userVacations = response.data;
        
        userVacations.forEach(v => {
            v = this.dateFormat(v);
        });

        return userVacations;
    }

    // function for follow vacation
    public async followNewVacation(vacationId: number): Promise<void>{

        // AJAX request 
        await axios.post<number>(appConfig.followVacationUrl + vacationId);
    }
    
    // function for un-follow vacation
    public async unFollowVacation(vacationId: number): Promise<void>{
            // AJAX request 
            await axios.post<number>(appConfig.unFollowVacationUrl + vacationId);
    }

    // get all the statistics about vacation's follows
    public async getFollowsStatistics(): Promise<FollowStatisticsModel[]>{
            
        // AJAX request
        const response = await axios.get<FollowStatisticsModel[]>(appConfig.allFollowsStatisticsUrl);
        const statistics = response.data;

        return statistics;
    
    }

    // add new vacation
    public async addNewVacation(vacation: VacationModel): Promise<VacationModel>{

        // AJAX request - sending a new vacation and receiving back the added vacation with ID from the DB 
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("image", vacation.image[0]);
        myFormData.append("price", vacation.price.toString()); 
        
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

        const addedVacation = this.dateFormat(response.data);        

        // add to global state
        vacationStore.dispatch({type: VacationsActionType.AddVacation, payload: addedVacation});

        return addedVacation;
    }

    // update vacation
    public async updateVacation(vacation: VacationModel): Promise<VacationModel>{

        // AJAX request - sending the vacation and receiving back the updated vacation with ID from the DB 
        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("image", vacation.image[0]);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("followersCount", vacation.followersCount.toString());

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myFormData);

        const updatedVacation = this.dateFormat(response.data);

        // update in global state
        vacationStore.dispatch({type: VacationsActionType.UpdateVacation, payload: updatedVacation});

        return updatedVacation;
    }

    // delete vacation
    public async deleteVacation(vacationId: number): Promise<void>{

        // delete from DB
        await axios.delete<void>(appConfig.vacationsUrl + vacationId);

        // delete from global state
        vacationStore.dispatch({type: VacationsActionType.DeleteVacation, payload: vacationId});

    }
}

const vacationService = new VacationService();

export default vacationService;