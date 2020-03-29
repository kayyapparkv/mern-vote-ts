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

const showUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = (<any>req).decoded;
        const user = await db.User.findById(id).populate('polls');
        res.status(200).json(
            user.polls
        );
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

const getPoll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;

        const poll = await db.Poll.findById(id).populate('user', ['username', 'id']);

        if (!poll) {
            throw new Error('Requested Poll Does\'nt Found');
        }

        res.status(200).json({
            poll
        });
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

const deletePoll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = (<any>req).decoded;

        const poll = await db.Poll.findById(pollId);

        if (!poll) {
            throw new Error('Requested Poll Does\'nt Found');
        }

        if (poll.user.toString() !== userId) {
            throw new Error('Unauthorized access');
        }

        const polls = poll;

        await poll.remove();

        res.status(202).json({
            polls
        });
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

const vote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = (<any>req).decoded;
        const {answer} = req.body;

        if (answer) {
            const poll = await db.Poll.findById(pollId);
            if (!poll) {
                throw new Error('No poll found');
            }
            let flag: number = 0;
            let count: number = 0;
            const vote = poll.options.map(options => {
                count = count + 1;
                if (options.option === answer) {
                    return {
                        option: options.option,
                        _id: options._id,
                        votes: options.votes + 1
                    };
                } else {
                    flag = flag + 1;
                    return options;
                }
            });

            if (poll.voted.filter(user =>
                user.toString() === userId).length <= 0) {
                if (count === flag) {
                    throw new Error('Answer provided does\'nt match');
                }
                poll.voted.push(userId);
                poll.options = <any>vote;
                await poll.save();
                res.status(200).json ({
                    poll
                });
            } else {
                throw new Error('Already voted');
            }
        } else {
            throw new Error('Answer not provided');
        }
    } catch (err) {
        err.status = 400;
        next(err);
    }
};

export default {
    createPoll,
    showPoll,
    showUser,
    getPoll,
    deletePoll,
    vote
};
