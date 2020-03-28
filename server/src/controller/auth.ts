import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config';

import db from '../model';

const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let user: any;

        user = await db.User.create(req.body);

        const { id, username } = user;

        const key = Buffer.from(config.SECRET, 'base64');

        const token = jwt.sign( {id, user}, key);

        res.status(201).json({
            id,
            username,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            err.message = 'Sorry, the username already exists';
        }
        return next(err);
    }
};
const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let user: any;
        user = await db.User.findOne({username: { $eq: req.body.username}});
        const {id, username} = user;
        const valid = await bcrypt.compare(req.body.password, user.password);

        if (valid) {
            const key = new Buffer(config.SECRET, 'base64');
            const token = jwt.sign({id, username}, key);
            res.json({
                id,
                username,
                'action': 'success',
                token
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        err.message = 'Invalid username or password';
        return next(err);
    }
};

export default {
    register,
    login
};
