import { Navigate, Route, Routes } from "react-router-dom";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import AllVacations from "../../VacationsArea/AllVacations/AllVacations";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import Statistics from "../../VacationsArea/Statistics/Statistics";
import UserVacations from "../../VacationsArea/UserVacations/UserVacations";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/vacations/all" element={<AllVacations />} />
                <Route path="/vacations/my-vacations" element={<UserVacations />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
                <Route path="/vacations/statistics" element={<Statistics />} />
                <Route path="/auth/login" element={<Login/>} />
                <Route path="/auth/register" element={<Register/>} />
                <Route path="/auth/logout" element={<Logout/>} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
