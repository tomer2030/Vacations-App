// Global State for all vacations

import { createStore } from "redux";
import VacationModel from "../Models/vacationModel";

// the kind of global state
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// create the action type
export enum VacationsActionType {
    GetAllVacations = "GetAllVacations",
    GetVacationByUserId = "GetVacationByUserId",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// A single object which dispatch sends to Redux for some change
export interface VacationsAction {
    type: VacationsActionType; // what type of action
    payload: any; // the transform data
}

// a function which will be invoked when calling dispatch to perform the operation
export function vacationReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    // duplicate the current state to a new one
    const newState = {...currentState};

    // create a action for any option
    switch(action.type){

        // get All the vacations
        case VacationsActionType.GetAllVacations:
            newState.vacations = action.payload;
            break;

        // add new vacation
        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload);
            
            break;

        // update a vacation
        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId)
            if(indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;                
            }
            break;

        // delete a vacation
        case VacationsActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            
            if(indexToDelete != 0){
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

    }

    // return the new state after manipulation
    return newState;
}

export const vacationStore = createStore(vacationReducer);