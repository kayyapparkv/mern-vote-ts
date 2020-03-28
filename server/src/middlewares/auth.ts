import jwt, { decode } from 'jsonwebtoken';

import config from '../config';
import { Request, Response, NextFunction } from 'express';

const Authorization = 'authorization';

export default (req: Request, res: Response, next: NextFunction) => {
    if ( req.headers[Authorization]) {
        if (req.headers.authorization.startsWith('Bearer ')) {
            const token = req.headers.authorization.substring(7, req.headers.authorization.length);
            const secret = Buffer.from( config.SECRET, 'base64');
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    next(Error('Failed to Authenticate'));
                } else {
                    (<any>req).decoded = decoded;
                    next();
                }
            });
        } else {
            next(Error('Not Authorized user'));
        }
    } else {
        next(Error('No token provided'));
    }
};
