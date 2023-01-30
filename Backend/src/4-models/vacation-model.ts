import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public imageName: string;
    public image: UploadedFile;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public followersCount: number

    public constructor (vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.followersCount = vacation.followersCount;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(20),
        description: Joi.string().required().min(5).max(100),
        imageName: Joi.string().optional(),
        image: Joi.object().optional(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().min(Joi.ref('startDate')),
        price: Joi.number().required().min(0),
        followersCount: Joi.number().optional().min(0)
    });

    public validate():string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;