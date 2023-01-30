import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import RoleModel from "../4-models/role-model";
import crypto from "crypto";
import { UnauthorizedErrorModel } from "../4-models/error-models";


const secretKey = "ToViWebsite"

// function for new token
function getNewToken(user: UserModel): string {

    // delete the password before create the token
    delete user.password;
    
    const container = { user };
    
    const options = { expiresIn: "10h" };
    
    // create the token
    const token = jwt.sign(container, secretKey, options);
    return token;

}

// function for verify the token 
function verifyToken(request: Request): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
        try {
            
            // get the token
            const header = request.header("authorization");
            if(!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);

            // if there is no token
            if(!token){
                resolve(false);
                return;
            }

            // verify the token
            jwt.verify(token, secretKey, err => {
                if(err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });

        } catch (error: any) {
            reject(error);
        }

    });
}

async function rescueUserFromToken(request: Request): Promise<UserModel>{

    // verify the token
    const isValid = verifyToken(request);
    if(!isValid) throw new UnauthorizedErrorModel("invalid token");

    // get the token
    const header = request.header("authorization");
    const token = header.substring(7);

    // Extract container from token:
    const container: any = jwt.decode(token);
        
    // Extract user: 
    const user: UserModel = container.user;
    
    return user;

}

async function verifyAdmin(request: Request): Promise<boolean> {
    
    // check if logged in
    const isLoggedIn = await verifyToken(request);    
    if(!isLoggedIn) return false;

    // get the user from token
    const user: UserModel = await rescueUserFromToken(request);
    
    // return true if user is admin and false if user is customer
    return user.roleId === RoleModel.Admin;
}

// function for hashing and salt
function hash(plainText: string): string {
    
    // the salt
    const salt = "theBestWebsiteEver";

    // hash with the salt
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");
    return hashedText
}

export default {
    getNewToken, rescueUserFromToken, verifyToken, verifyAdmin, hash
};