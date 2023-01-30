import fs from "fs";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import {v4 as uuid} from "uuid"
import { OkPacket } from "mysql";
import FollowModel from "../4-models/follow-mosel";


async function getAllVacations(): Promise<VacationModel[]> {
    
    // sql for get all the vacations from the DB
    const sql = `
        SELECT
            V.vacationId,
            V.destination,
            V.description,
            V.imageName,
            V.startDate,
            V.endDate,
            V.price, 
            COUNT(F.userId) AS followersCount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId
        GROUP BY vacationId
        ORDER BY startDate ASC;
    `;
    const vacations = await dal.execute(sql); 
    return vacations;
}

async function getOneVacation(vacationId: number): Promise<VacationModel> {
    
    // sql for get one vacation from the DB
    const sql = `
        SELECT
        V.vacationId,
        V.destination,
        V.description,
        V.imageName,
            DATE_FORMAT(V.startDate, '%Y-%m-%d') as startDate,
            DATE_FORMAT(V.endDate, '%Y-%m-%d') as endDate,
            V.price,
            COUNT(F.userId) AS followersCount
            FROM vacations AS V LEFT JOIN followers AS F
            ON V.vacationId = F.vacationId
            WHERE V.vacationId = ?
    `;
    const vacation = await dal.execute(sql, vacationId);

    // if vacationId not exist
    if(vacation.length === 0) throw new ResourceNotFoundErrorModel(vacationId);
    return vacation[0];

}

async function getVacationsForUser(userId: number): Promise<VacationModel[]> {
    
    // query for get all the vacations from the DB
    const sql = `
        SELECT DISTINCT
	        V.*,
            EXISTS(
                SELECT * 
                FROM followers 
                WHERE UserId = ? 
                AND vacationId = F.VacationId) 
                AS isFollowing
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.VacationId
        WHERE F.UserId = ?
        GROUP BY vacationId
        ORDER BY startDate ASC;
    `;
    const values = [userId, userId]
    const vacations = await dal.execute(sql, values);
    return vacations;

}

async function followVacation(vacationId: number, userId: number) :Promise<boolean> {

    // the query
    const sql = `
        INSERT INTO followers
        VALUES(?, ?);
    `;
    const values = [vacationId, userId];
    const info: OkPacket = await dal.execute(sql, values);
    
    // if it not added to DB, return false
    if(info.affectedRows === 0) return false;
    return true;

}

async function unFollowVacation(vacationId: number, userId: number) :Promise<boolean> {

    // the query
    const sql = `
        DELETE FROM followers
        WHERE vacationId = ? AND userId = ?;
    `;
    const values = [vacationId, userId];
    const info: OkPacket = await dal.execute(sql, values);
    
    // if it not deleted from DB, return false
    if(info.affectedRows === 0) return false;
    return true;

}

async function getFollowsStatistics(): Promise<VacationModel[]> {

    // query for get all the vacation's names and how much followers there have 
    const sql = `
        SELECT DISTINCT
                V.destination,
                COUNT(F.userId) AS followersCount
            FROM vacations AS V LEFT JOIN followers AS F
            ON V.vacationId = F.VacationId
            GROUP BY F.vacationId
            ORDER BY startDate DESC;
    `;
    const followersForVacation = await dal.execute(sql);    
    return followersForVacation;

}

async function addNewVacation(vacation: VacationModel): Promise<VacationModel>{
    
    // validation
    const error = vacation.validate();
    if(error) throw new ValidationErrorModel(error);

    // save the img in the disk if exist        
    if(vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));

        // unique name for the image
        vacation.imageName = uuid() + extension;
        
        // save the image in the disk
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }

    // save the vacation on the DB
    const sql = `
        INSERT INTO vacations
        VALUES(
            DEFAULT, ?, ?, ?, ?, ?, ?
        );
    `
    const values = [vacation.destination, vacation.description, vacation.imageName, vacation.startDate, vacation.endDate, vacation.price];
    const info: OkPacket = await dal.execute(sql, values);
    vacation.vacationId = info.insertId;

    // return the added vacation
    return vacation;

}

async function updateVacation(vacation: VacationModel): Promise<VacationModel>{

    // validation
    const error = vacation.validate();
    if(error) throw new ValidationErrorModel(error);

    // get the previous image name:
    const prevPicSql = `
        SELECT * FROM vacations
        WHERE vacationId = ?
    `;
    const data = await dal.execute(prevPicSql, vacation.vacationId);
    
    // execute the image name 
    const prevImgName = data[0].imageName;         
    
    // save new image on disk if exist
    if(vacation.image) {
                
        if(prevImgName.length !== 0) {
            
            // if we have a previous image in hard disk:
            if(fs.existsSync("./src/1-assets/images/" + prevImgName)) {
    
                // delete it:
                fs.unlinkSync("./src/1-assets/images/" + prevImgName);
            }
        } 
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;

        // save the new image in hard disk
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);

        // delete the image from object before send to DB
        delete vacation.image;


    } else {
        
        // put the previous imageName in the updated vacation
        vacation.imageName = prevImgName;
    }

    // update the vacation on DB
    const sql = `
        UPDATE vacations
        SET
            destination = ?,
            description = ?,
            imageName = ?,
            startDate = ?,
            endDate = ?,
            price = ?
        WHERE vacationId = ?
    `;
    const values = [vacation.destination, vacation.description, vacation.imageName, vacation.startDate, vacation.endDate, vacation.price, vacation.vacationId];
    const  info: OkPacket = await dal.execute(sql, values);

    // if not exist
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);

    // return the vacation updated
    return vacation;

}

async function deleteVacation(vacationId: number): Promise<void>{

    // get the imageName from the DB
    const nameSql = `
        SELECT imageName
        FROM vacations
        WHERE vacationId = ?
    `;
    const data = await dal.execute(nameSql, vacationId);

    // execute the image name 
    const imageName = data[0].imageName; 
    
    // delete the image if exist from disk
    if(fs.existsSync("./src/1-assets/images/" + imageName)) {
        fs.unlinkSync("./src/1-assets/images/" + imageName);
    }

    // delete from the DB
    const deleteSql = `DELETE FROM vacations WHERE vacationId = ?`;
    const info: OkPacket = await dal.execute(deleteSql, vacationId);

    // if not exist
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);

}

export default {
    getAllVacations, getOneVacation, getVacationsForUser, getFollowsStatistics, addNewVacation, updateVacation, deleteVacation, followVacation, unFollowVacation
};
