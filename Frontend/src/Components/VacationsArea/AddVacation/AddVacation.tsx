import { PhotoCamera } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<VacationModel>();
    const [startDate, setStartDate] = useState("");

    // callback for handle the start date and use it for the min validation in end date
    const handleChange = (event: any) => {
        setStartDate(event.target.value);
    }
    const navigate = useNavigate();

    async function send(vacation: VacationModel){
        try {            
            await vacationService.addNewVacation(vacation);
            notifyService.success("success added vacation");
            navigate("/home");
        } catch (err) {
            notifyService.error(err);
        }
    }

    // function for handle if there is an error or not
    function handleErrorBox(err: any) {
        if(err) return true;
        return false
    }

    return (
        <div className="AddVacation Box">
            <form onSubmit={handleSubmit(send)}>

			    <h2>Add new vacation</h2>

                <TextField
                    className="MuiInput"
                    type="text"
                    label="Destination"
                    variant="outlined"
                    required
                    size="small"
                    error={handleErrorBox(formState.errors.destination)}
                    {...register("destination", VacationModel.validation.destination)}
                    helperText={formState.errors.destination?.message}
                />

                <TextField
                    className="MuiInput"
                    type="text"
                    label="Description"
                    variant="outlined"
                    required
                    size="small"
                    error={handleErrorBox(formState.errors.description)}
                    {...register("description", VacationModel.validation.description)}
                    helperText={formState.errors.description?.message}
                />

                <div className="imgBox">
                    <label>Destination Picture: </label>
                    <input accept="image/*" type="file" {...register("image")}/>
                </div>

                <TextField
                    inputProps={{min: new Date().toISOString().split("T")[0]}}
                    className="MuiInput"
                    type="date"
                    label="From"
                    variant="outlined"
                    required
                    size="small"
                    onInput={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={handleErrorBox(formState.errors.startDate)}
                    {...register("startDate", VacationModel.validation.startDate)}
                    helperText={formState.errors.startDate?.message}
                />
                        
                <TextField
                    inputProps={{min: startDate}}
                    className="MuiInput"
                    type="date"
                    label="To"
                    variant="outlined"
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    error={handleErrorBox(formState.errors.endDate)}
                    {...register("endDate", VacationModel.validation.endDate)}
                    helperText={formState.errors.endDate?.message}
                />

                <TextField
                    className="MuiInput"
                    type="number"
                    label="Price"
                    variant="outlined"
                    required
                    size="small"
                    error={handleErrorBox(formState.errors.price)}
                    {...register("price", VacationModel.validation.price)}
                    helperText={formState.errors.price?.message}
                />

                <Button className="MuiButton" variant="contained" type="submit">Add</Button>
                
            </form>
        </div>
    );
}

export default AddVacation;
