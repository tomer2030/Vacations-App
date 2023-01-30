class Config {
    private baseUrl = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:3001/api/";
    public vacationsUrl = this.baseUrl + "vacations/";
    public vacationImageUrl = this.baseUrl + "vacations/image/";
    public allVacationsForUserUrl = this.baseUrl + "vacations/user-follows/";
    public followVacationUrl = this.baseUrl + "vacations/follows/new/";
    public unFollowVacationUrl = this.baseUrl + "vacations/follows/un-follow/";
    public allFollowsStatisticsUrl = this.baseUrl + "vacations/follows/all/";
    public login = this.baseUrl + "auth/login/";
    public register = this.baseUrl + "auth/register/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
