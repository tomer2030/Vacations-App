import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorsService {
    public createInterceptors(): void {
        axios.interceptors.request.use(request => {

            // if there is a token
            if(authStore.getState().token) {
                // create JWT header with that token
                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                }
            }

            return request;
        });
    }
}

const interceptorsService = new InterceptorsService(); 

export default interceptorsService;