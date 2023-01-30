import { Button } from "@mui/material";
import TextField from "@mui/material/TextField/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Login(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel): Promise<void> {
        try {            
            await authService.login(credentials);
            notifyService.success("welcome back!");
            navigate("/home");
        } catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">
            
            <form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

                <TextField
                    className="MuiInput"
                    type="text"
                    label="Username"
                    variant="outlined"
                    required
                    size="small"
                    {...register("username", CredentialsModel.validation.username)}
                />

                <TextField
                    className="MuiInput"
                    type="password"
                    label="Password"
                    variant="outlined"
                    required
                    size="small"
                    {...register("password", CredentialsModel.validation.password)}
                />

                <Button className="MuiButton" variant="contained" type="submit">Login</Button>
            </form>

        </div>
    );
}

export default Login;
