class CredentialsModel {

    public username: string;
    public password: string;

    public static validation = {
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

export default CredentialsModel;