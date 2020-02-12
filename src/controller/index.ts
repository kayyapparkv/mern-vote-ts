import { Request, Response, NextFunction, response } from 'express';
// import  register from './auth';


const notFound = (req: Request, res: Response, next: NextFunction) => {
    const err =  new ResponseError();
    err.message = 'Requested URL not found';
    err.status = 400;
    return next(err);
};

const errors = (err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 404).json({
        message: err.message || 'something went wrong'
    });
};

class ResponseError extends Error {
    message: string;
    status: number;
}

export default {
    notFound,
    errors
};