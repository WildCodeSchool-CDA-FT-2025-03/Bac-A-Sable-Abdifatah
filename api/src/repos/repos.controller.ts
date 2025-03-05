import express, { Request, Response } from 'express';
import jsonData from '../../data.json';
import {Repo} from './repos.type';
const repos = express.Router();

repos.get('/', (req: Request, res: Response)=>{
    res.status(200).json(jsonData);
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

export default repos;