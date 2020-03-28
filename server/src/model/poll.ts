import mongoose from 'mongoose';

interface OptionSchema extends mongoose.Document {
    option: string;
    votes: number;
}

export interface PollSchemaDocument extends mongoose.Document {
    _doc: OptionSchema[];
    user: any;
    question: string;
    options: OptionSchema[];
    voted: any[];
    created: Date;

}

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [optionSchema],
    voted: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

const poll = mongoose.model<PollSchemaDocument>('Poll', pollSchema);

export default poll;