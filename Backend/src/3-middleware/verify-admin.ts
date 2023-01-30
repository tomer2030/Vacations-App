import { NextFunction, Request, Response } from "express";
import authService from "../2-utils/authService";
import { UnauthorizedErrorModel } from "../4-models/error-models";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try{
        const isAdmin = await authService.verifyAdmin(request);
        if(!isAdmin) throw new UnauthorizedErrorModel("you are not admin");
        next();
    }
    catch(err: any){
        next(err);
    }
    
}

export default verifyAdmin;