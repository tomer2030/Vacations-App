import { Button,  TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<VacationModel>();
    
    // parameter for limit the end date
    const [startDate, setStartDate] = useState<string>();
    const navigate = useNavigate();

    // for get the id from route
    const params = useParams();

    useEffect(()=>{
        const id = +params.vacationId;
        vacationService.getOneVacation(id)
            .then(vacation =>{
                // set the values of the vacation in the form
                setValue("vacationId", vacation.vacationId);
                setValue("followersCount", vacation.followersCount);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);

                // set vacation start date
                setStartDate(vacation.startDate);
            }). catch(err => notifyService.error(err))
    },[]);

    // callback for handle the start date and use it for the min validation in end date
    const handleChange = (event: any) => {
        setStartDate(event.target.value);
    }
    
    // function for handle if there is an error or not
    function handleErrorBox(err: any) {
        if(err) return true;
        return false
    }


    async function send(vacation: VacationModel){
        try {
            await vacationService.updateVacation(vacation);
            notifyService.success("success update vacation");
            navigate("/home");
        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation Box">
            <form onSubmit={handleSubmit(send)}>

			    <h2>Edit vacation</h2>

                {/* add the vacation id in the form */}
                <input type="hidden" {...register("vacationId")} />

                {/* add the followers count in the form */}
                <input type="hidden" {...register("followersCount")} />

                <TextField
                    className="MuiInput"
                    type="text"
                    label="Destination"
                    variant="outlined"
                    required
                    size="small"
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    error={handleErrorBox(formState.errors.description)}
                    {...register("description", VacationModel.validation.description)}
                    helperText={formState.errors.description?.message}
                />

                <div className="imgBox">
                    <label>Destination Picture: </label>
                    <input accept="image/*" type="file" {...register("image")}/>
                </div>

                <TextField
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
                    InputLabelProps={{ shrink: true }}
                    error={handleErrorBox(formState.errors.price)}
                    {...register("price", VacationModel.validation.price)}
                    helperText={formState.errors.price?.message}
                />

                <Button className="MuiButton" variant="contained" type="submit">Update</Button>
                
            </form>
        </div>
    );   
}

export default EditVacation;
