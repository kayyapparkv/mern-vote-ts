import cors from 'cors';
import bodyparser from 'body-parser';
import express from 'express';

import config from './config';
import routes from './routes';
import controller from './controller';

const server = express();
const port = config.PORT;


server.listen(port, (err: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on port ${port}`);
});

server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
server.use(cors());


server.use('/api/auth', routes.auth);
// server.use('/api/polls', poll);
server.use(controller.notFound);
server.use(controller.errors);
