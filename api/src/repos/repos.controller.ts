import express, { NextFunction, Request, Response } from 'express';
import jsonData from '../../data.json';
import { Repo } from './repos.type';
import { validateRepo } from './repos.validation';
const repos = express.Router();

let data = jsonData;
repos.get('/', (req: Request, res: Response)=>{
    const queryParam = req.query;
    let filteredData = queryParam.isPrivate ? data.filter((repo: Repo) => repo.isPrivate.toString() === queryParam.isPrivate) : data;

    filteredData = queryParam.limit ? data.slice(0, +queryParam.limit) : data;

    if (queryParam.fields) {
        const fields = typeof queryParam.fields === "string" ? queryParam.fields.split(",") : []
        filteredData = filteredData.map((repo: Repo) => {
            const filteredRepo = fields.reduce((acc: Repo, field: keyof Repo) => {
                acc[field] = repo[field];
                return acc;
            }, {} as Repo)
            return filteredRepo
        })
    }

    res.status(200).json(filteredData);
})

repos.get('/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    const repo = data.find((repo: Repo) => repo.id === id) as Repo;
    if(repo){
        res.status(200).json(repo);
    }else{
        res.status(404).send(`Repo ${id} not found`);
    }
})

repos.get('/names', (req: Request, res: Response) => {
    const names = data.map((repo: Repo) => {
        return {
            name: repo.name,
        }
    });
    res.status(200).json(names);
})

repos.post("/", validateRepo, (req: Request, res: Response, next: NextFunction) => {
    const repo: Repo = { ...req.body, id: Math.ceil(Math.random() * 1000).toString(), createdAt: new Date().toISOString() };
    console.log({ repo });
    data.push(repo);
    res.status(201).send({ createdRepoId: repo.id });
});

repos.delete("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    if (!data.find((repo: Repo) => repo.id === id)) {
        res.status(404).send(`Repo ${id} not found`);
    } else {
        data = data.filter((repo: Repo) => repo.id !== id);
        res.send(`Repo ${id} deleted`);
    }
})

repos.put("/:id", validateRepo, (req: Request, res: Response) => {
    const id = req.params.id;
    const repo = data.find((repo: Repo) => repo.id === id);
    if (!repo) {
        res.status(404).send(`Repo ${id} not found`);
    } else {
        const updatedRepo = { ...repo, ...req.body, updatedAt: new Date().toISOString() };
        data = data.map((repo: Repo) => repo.id === id ? updatedRepo : repo);
        res.status(200).send(`Repo ${id} updated`);
    }

});

repos.patch("/:id", validateRepo, (req: Request, res: Response) => {
    const id = req.params.id;
    const repo = data.find((repo: Repo) => repo.id === id);
    if (!repo) {
        res.status(404).send(`Repo ${id} not found`);
    } else {
        const updatedRepo = { ...repo, ...req.body, updatedAt: new Date().toISOString() };
        data = data.map((repo: Repo) => repo.id === id ? updatedRepo : repo);
        res.status(200).send(`Repo ${id} updated`);
    }
});

export default repos;