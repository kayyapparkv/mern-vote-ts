import { Request, Response, NextFunction } from 'express';

import db from '../model';


const createPoll = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = (<any>req).decoded;

        const {question, options} = req.body;

        const user = await db.User.findById(id);

        const poll = await db.Poll.create({
            user,
            question,
            options: options.map((option: any) => ({
                option,
                votes: 0
            }))
        });

        user.polls.push(poll._id);
        await user.save();

        res.status(201).json({
            question: poll.question,
            answer: poll.options,
            user: user._id
        });
    } catch (err) {
        return next(err);
    }
};

const showPoll = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const polls = await db.Poll.find().populate('user', ['id', 'username']);

        res.status(200).json(polls);
    } catch (err) {
        err.status = 400;
        return next(err);
    }
};

export default {
    createPoll,
    showPoll
};
