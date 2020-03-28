import mongoose, { Schema, mongo } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserSchemaDocument extends mongoose.Document {
    username: string;
    password: string;
    created: Date;
    polls: any[];

}

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        length: 60
    },
    created: {
        type: Date,
        Default: Date.now()
    },
    polls : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
});

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const plainText = this.get('password');
        const head = await bcrypt.hash(plainText, 10);
        this.set('password', head);
    } catch (err) {
        return next(err);
    }
});
const user = mongoose.model<UserSchemaDocument>('User', userSchema);
export default user;