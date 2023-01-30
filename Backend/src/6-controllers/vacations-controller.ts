import express, { Request, Response, NextFunction } from "express";
import authService from "../2-utils/authService";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
import path from "path"

const router = express.Router(); // Capital R

// get all vacations -> GET http://localhost:3001/api/vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations();     
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// get one vacation -> GET http://localhost:3001/api/vacations/:vacationId
router.get("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationsLogic.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// get all the vacations that the user follow -> GET http://localhost:3001/api/vacations/user-follows/:userId

// change it to received userId from the token?
router.get("/vacations/user-follows/:userId",verifyLoggedIn ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        const vacations = await vacationsLogic.getVacationsForUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// users's follow request to new vacation -> POST http://localhost:3001/api/vacations/follows/new/:vacationId
router.post("/vacations/follows/new/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get the vacationId from the route
        const vacationId = +request.params.vacationId;
        
        // get the user from the token 
        const user = await authService.rescueUserFromToken(request);        

        // add follow request and check if there is a problem
        const isAdded = await vacationsLogic.followVacation(vacationId, user.userId);
        if(!isAdded) throw new ValidationErrorModel("the vacation isn't added")
        response.sendStatus(200);
    }
    catch (err: any) {
        next(err);
    }
});

// users's unFollow request to follow vacation -> POST http://localhost:3001/api/vacations/un-follows/:vacationId
router.post("/vacations/follows/un-follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // get the vacationId from the route
        const vacationId = +request.params.vacationId;        
        
        // get the user from the token 
        const user = await authService.rescueUserFromToken(request);

        // remove the vacation from follows and check if there is a problem
        const isRemoved = await vacationsLogic.unFollowVacation(vacationId, user.userId);
        if(!isRemoved) throw new ValidationErrorModel("the vacation isn't remove")
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// get all the follow statistics per vacation -> GET http://localhost:3001/api/vacations/follows/all
router.get("/vacations/follows/all", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followsStatistics = await vacationsLogic.getFollowsStatistics();
        response.json(followsStatistics);
    }
    catch (err: any) {
        next(err);
    }
});

// add new vacation -> POST http://localhost:3001/api/vacations
router.post("/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        // create new vacation from the frontend data 
        const vacation = new VacationModel(request.body);
        
        // return the added vacation with the id from the DB
        const addedVacation = await vacationsLogic.addNewVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// update exist vacation -> PUT http://localhost:3001/api/vacations/:vacationId
router.put("/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        // get the id of the updated vacation
        const vacationId = +request.params.vacationId;        

        // Take uploaded file, set it to the body:
        request.body.image = request.files?.image;

        // create new vacation from the frontend data 
        const newVacation = new VacationModel(request.body);        

        // add the vacationId to the updated vacation 
        newVacation.vacationId = vacationId;

        const updatedVacation = await vacationsLogic.updateVacation(newVacation);

        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// delete vacation -> DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        // get the id of the updated vacation
        const vacationId = +request.params.vacationId;
        
        // delete from the DB
        await vacationsLogic.deleteVacation(vacationId);

        // sent a 204 status to the frontend
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// get vacation picture -> GET http://localhost:3001/api/vacations/picture/:pictureName
router.get("/vacations/image/:imageName", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // get image name from request
        const imageName = request.params.imageName;

        // make an absolute path
        const absolutePath = path.join("C:", "Users", "tomer", "OneDrive", "שולחן העבודה", "JB", "02 - Projects", "Vacations - Tomer Viner", "Fullstack Vacations", "Backend", "src", "1-assets", "images", imageName);
        
        // send the image
        response.sendFile(absolutePath);
        
    } catch (err) {
        next(err);
    }

});

export default router;