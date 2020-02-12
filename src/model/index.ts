import mongoose, { mongo } from 'mongoose';

import config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if (err) {
        console.error(`Error connecting to DB, check the URL you have passed , if yes then make sure you have an active connecti0n with DB`);
    }
    console.log(`Successfully established an active connection with the DB`);
});


import Poll from './poll';
import User from './user';

export default {
    Poll,
    User
};
