import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {

    // register function
    public async register(user: UserModel): Promise<void> {

        // send to backend the new user
        const response = await axios.post<string>(appConfig.register, user);

        // get token from the backend
        const token = response.data;

        // send token to global state
        authStore.dispatch({type: AuthActionType.Register, payload: token});
    }

    // login function
    public async login(credentials: CredentialsModel): Promise<void> {

        // send to backend the credentials
        const response = await axios.post<string>(appConfig.login, credentials);

        // get token from the backend
        const token = response.data;

        // send token to global state
        authStore.dispatch({type: AuthActionType.Login, payload: token});
    }

    // logout function
    public logout(): void {

        // delete token from global state
        authStore.dispatch({type: AuthActionType.Logout});
    }

    // function for check verify admin & user
    public verifyAdminAndUser(setVerifyAdmin: Function, setVerifyUser: Function): void {
        if((authStore.getState().user?.roleId === 2)){
            setVerifyAdmin(true);
            setVerifyUser(false);
        }
        else if((authStore.getState().user?.roleId === 1)){
            setVerifyUser(true);
            setVerifyAdmin(false);
        }
        else {
            setVerifyAdmin(false);
            setVerifyUser(false);
        }
    }

}

const authService = new AuthService();

export default authService;