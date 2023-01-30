class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public imageName: string;
    public image: FileList;
    public startDate: string;
    public endDate: string;
    public price: number;
    public followersCount: number;

    // validation
    public static validation = {
        destination: {
            required: {value: true, message: "Missing destination"},
            minLength: {value: 2, message: "Destination too short"},
            maxLength: {value: 20, message: "Destination too long"}
        },
        description: {
            required: {value: true, message: "Missing description"},
            minLength: {value: 5, message: "Description too short"},
            maxLength: {value: 100, message: "Description too long"}
        },
        startDate: {
            required: {value: true, message: "Missing start date"}
        },
        endDate: {
            required: {value: true, message: "Missing start date"},
        },
        price: {
            required: {value: true, message: "Missing price"},
            min: {value: 20, message: "Price too short"},
            max: {value: 100000, message: "Price too long"}
        }
    }
}

export default VacationModel;