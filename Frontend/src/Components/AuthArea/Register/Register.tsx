import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Register(): JSX.Element {
    
    const {register, handleSubmit, formState} = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel): Promise<void> {
        try {
            // add to DB
            await authService.register(user);
            notifyService.success("hello " + user.firstName );
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // function for handle if there is an error or not
    function handleErrorBox(err: any) {
        if(err) return true;
        return false
    }

    return (
        <div className="Register Box">
			
            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <TextField
                    className="MuiInput"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    required
                    error={handleErrorBox(formState.errors.firstName)}
                    {...register("firstName", UserModel.validation.firstName)}
                    helperText={formState.errors.firstName?.message}

                />
                
                <TextField
                    className="MuiInput"
                    type="text"                    size="small"
                    label="Last Name"
                    variant="outlined"
                    required
                    error={handleErrorBox(formState.errors.lastName)}
                    {...register("lastName", UserModel.validation.lastName)}
                    helperText={formState.errors.lastName?.message}
                />
                
                <TextField
                    className="MuiInput"
                    type="text"                    size="small"
                    label="Username"
                    variant="outlined"
                    required
                    error={handleErrorBox(formState.errors.username)}
                    {...register("username", UserModel.validation.username)}
                    helperText={formState.errors.username?.message}
                />
                
                <TextField
                    className="MuiInput"
                    type="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    required
                    error={handleErrorBox(formState.errors.password)}
                    {...register("password", UserModel.validation.password)}
                    helperText={formState.errors.password?.message}
                />

                <Button className="MuiButton" variant="contained" type="submit">Register</Button>
                
            </form>

        </div>
    );
}

export default Register;
