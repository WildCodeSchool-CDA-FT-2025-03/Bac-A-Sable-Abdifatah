import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const createRepoSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    languages: Joi.array().items(
        Joi.object({
            size: Joi.number().required(),
            node: Joi.object({
                name: Joi.string().required(),
            }).required(),
        })
    ),
});

const validateRepo = (req: Request, res: Response, next:NextFunction) => {
    const { error } = createRepoSchema.validate(req.body);
    if (error) {
        res.status(422).send(error.details[0].message);
    }else{
        next();
    }
}

export { validateRepo };