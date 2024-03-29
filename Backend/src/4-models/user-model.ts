import Joi from "joi";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: number;

    public constructor(user:UserModel){
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(2).max(20),
        password: Joi.string().required().min(2).max(20),
        roleId: Joi.number().optional()
    });

    public validate():string {
        const result = UserModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default UserModel;