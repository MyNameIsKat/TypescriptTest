import { Request, Response, NextFunction, Express} from "express";
import {ExpressJoiError} from "express-joi-validation";

export const ValidateRequest = (app: Express) => {
    app.use((err: any|ExpressJoiError, req:Request, res: Response, next: NextFunction)=>{
        if(err && err.type) {
            const {details} = err.error;
            const e: {message: any;}[] = [];

            details.map((errors: {message:any;}) => {
                e.push(errors.message.replace(/"/g,''));
            })

            res.status(400).json({error: e});
        }else{
            res.status(500).end('internal server error')
        }
    })
}