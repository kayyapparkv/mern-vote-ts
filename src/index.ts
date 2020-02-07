import express, { Response, Request } from 'express';

const server = express();
const port = 3000;

server.listen(port, (err: any) => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on port ${port}`);
});

server.get('/', (req: Request, res: Response) => {
    return res.json({
        'hello': 'world'
    });
});