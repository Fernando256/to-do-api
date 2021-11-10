import { Request, Response } from 'express';
import { ToDo } from '../models/ToDo';

export const all = async (req: Request, res: Response) => {
    try {
        const list = await ToDo.findAll();
        res.json({list});
    }catch(error) {
        console.log(error);
        res.json({error: 'Algo deu errado!'});
    }
}


export const add = async (req: Request, res: Response) => {
    let title: string = req.body.title;
    if (title) {
        try {
            let newToDo = await ToDo.create({
                title,
                done: req.body.done ? true : false
            })
            res.status(201).json({item: newToDo});
        }catch(error) {
            console.log(error);
            res.json({error: 'Algo deu errado!'});
        }
    } else {
        res.json({error: 'Dados não enviados'});
    }
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    try {
        let toDo = await ToDo.findByPk(id);
        if (toDo) {
            if (req.body.title) 
                toDo.title = req.body.title;
            
            if (req.body.done) {
                switch (req.body.done.toLowerCase()) {
                    case 'true':
                    case '1':
                        toDo.done = true;
                        break;
                    case 'false':
                    case '0':
                        toDo.done = false;
                        break;
                }
            }
            await toDo.save();
            res.json({toDo});
        }else{
            res.json({error: 'item não encontrado!'});
        }
    }catch(error) {
        console.log(error);
        res.json({error: 'Algo deu errado!'});
    }
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;

    try {
        let toDo = await ToDo.findByPk(id);
        if (toDo)
            await toDo.destroy();

    }catch(error) {
        console.log(error);
        res.json({error: 'Algo deu errado!'});
    }
    res.json({});
}
