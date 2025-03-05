import express, { NextFunction, Request, Response } from 'express';
import jsonData from '../../data.json';
import {Repo} from './repos.type';
import { validateRepo } from './repos.validation';
import { json } from 'stream/consumers';
const repos = express.Router();

repos.get('/', (req: Request, res: Response)=>{
    res.status(200).json(jsonData);
})

repos.get('/names', (req: Request, res: Response) => {
    const names = jsonData.map((repo: any) => {
        return {
            name: repo.name,
            languages: repo.languages.map((lang: any) => lang.node.name),
        }
    });
    res.status(200).json(names);
})

repos.get('/:id', (req: Request, res: Response)=>{
    const id = req.params.id;
    const repo = jsonData.find((repo: any) => repo.id === id) as Repo;
    if(repo){
        res.status(200).json(repo);
    }else{
        res.status(404).send(`Repo ${id} not found`);
    }
})

repos.post("/", validateRepo, (req: Request, res: Response, next: NextFunction) => {
    const repo: Repo = { ...req.body, id: Math.ceil(Math.random() * 1000).toString(), createdAt: new Date().toISOString() };
    console.log({ repo });
    jsonData.push(repo);
    res.status(201).send("repo created : " + repo.id);
});

export default repos;