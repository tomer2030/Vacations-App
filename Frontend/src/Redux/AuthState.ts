// the global state for auth

import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

export class AuthState {

    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        // take token from session storage, restore if exists
        this.token = sessionStorage.getItem("token");
        if(this.token){
            const container: {user: UserModel} = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

// the action type
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// auth action
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// auth reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // duplicate current state:
    const newState = {...currentState};

    // options for the needed operation
    switch(action.type) {

        // register or login
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token);
            newState.user = container.user;
            sessionStorage.setItem("token", newState.token);
            break;

        // logout
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    // return the new state after manipulation
    return newState;
}
// auth store
export const authStore = createStore(authReducer);