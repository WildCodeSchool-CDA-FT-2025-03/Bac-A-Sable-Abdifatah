import express, {Request, Response} from 'express';
import repos from './repos/repos.controller';

const router = express.Router();

router.get('/', (_, res) => {
    res.status(200).send('Hello from router !');
});


router.use("/repos", repos);

export default router;