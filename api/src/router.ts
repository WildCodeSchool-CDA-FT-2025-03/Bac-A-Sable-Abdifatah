import express, {Request, Response} from 'express';
import repos from './repos/repos.controller';
import languages from "./languages/languages.controller";

const router = express.Router();

router.get("/", (_, res) => {
  res.status(200).send("Hello from router !");
});

router.use("/repos", repos);
router.use("/languages", languages);

export default router;