import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

// Sanitize tags from request body
function sanitize(request: Request , response: Response, next: NextFunction) {
    
    // Run on request.body object
    for(const prop in request.body) {
        
        // If property is string
        if(typeof request.body[prop] === "string") {
            
            // strip tags if exist
            request.body[prop] === striptags(request.body[prop]);
        }
    }
    next();
}

export default sanitize;
