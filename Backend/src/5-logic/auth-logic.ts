import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import tokenService from "../2-utils/authService";
import CredentialsModel from "../4-models/credentials-model";
import { ValidationErrorModel } from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {
    
    // validation 
    const error = user.validate();
    if(error) throw new ValidationErrorModel(error);
    
    const checkExistUserSql = `
    SELECT username FROM users
    WHERE username = ?;
    `;
    
    // check if the username already exist 
    const isUserExist = await dal.execute(checkExistUserSql, user.username);
    
    if(isUserExist.length !== 0) throw new ValidationErrorModel("Username already exist");
    
    // hash the password
    user.password = tokenService.hash(user.password);

    // define the new user as customer user
    user.roleId = RoleModel.User;

    // sql for add the new user
    const newUserSql = `
        INSERT INTO users
        VALUES(
            DEFAULT, ?, ?, ?, ?, ?
        )
    `;

    // all the new user data for the DB 
    const values = [user.firstName, user.lastName, user.username, user.password, user.roleId];

    // add the user to the DB
    const info: OkPacket = await dal.execute(newUserSql, values);
    user.userId = info.insertId;
    
    // get token
    const token = tokenService.getNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    
    // validation
    const error = credentials.validate();
    if(error) throw new ValidationErrorModel(error);
    
    // hash
    credentials.password = tokenService.hash(credentials.password);
    
    // check if user & password exist
    const sql =`
        SELECT * FROM users
        WHERE username = ? AND password = ?;
    `;
    const values = [credentials.username, credentials.password];
    const users = await dal.execute(sql, values);
    const user: UserModel = users[0];

    // if user doesn't
    if(!user) throw new ValidationErrorModel("Incorrect username or password");

    // generate token
    const token = tokenService.getNewToken(user);
    return token;
}

export default {
    register, login
};
