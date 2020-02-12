import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserSchemaDocument extends mongoose.Document {
    // tslint:disable-next-line: ban-types
    username: String;
    // tslint:disable-next-line: ban-types
    password: String;
    created: Date;
    // tslint:disable-next-line: ban-types
    polls: String;

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