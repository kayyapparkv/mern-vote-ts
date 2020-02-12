import { Request, Response, NextFunction } from 'express';



export const nothing = async(req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
        'ok': 'success'
    });
};
