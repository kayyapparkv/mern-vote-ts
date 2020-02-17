import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserSchemaDocument extends mongoose.Document {
    username: string;
    password: string;
    created: Date;
    polls: string;

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
        console.log(`password before hashing ${plainText}`);
        const head = await bcrypt.hash(plainText, 10);
        this.set('password', head);
        console.log(`passwors after hasing ${this.get('password')}`);
    } catch (err) {
        return next(err);
    }
});
export default mongoose.model('User', userSchema);