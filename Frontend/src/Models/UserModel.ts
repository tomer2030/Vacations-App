class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: number;

    public static validation = {
        firstName: {
            required: {value: true, message: "Missing first name"},
            minLength: {value: 2, message: "First name too short"},
            maxLength: {value: 20, message: "First name too long"}
        },
        lastName: {
            required: {value: true, message: "Missing last name"},
            minLength: {value: 2, message: "Last name too short"},
            maxLength: {value: 20, message: "Last name too long"}
        },
        username: {
            required: {value: true, message: "Missing username"},
            minLength: {value: 2, message: "Username too short"},
            maxLength: {value: 20, message: "Username too long"}
        },
        password: {
            required: {value: true, message: "Missing password"},
            minLength: {value: 2, message: "Password too short"},
            maxLength: {value: 20, message: "Password too long"}
        }
    }
}

export default UserModel;