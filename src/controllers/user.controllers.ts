import {Request, Response} from 'express';
import { User } from '../entities/User';


export const createUser = async(req: Request, res: Response) => {
    try {
        const {firstname, lastname} = req.body
    
        const user = new User()
        user.firstname = firstname
        user.lastname = lastname

        await user.save()
    
        return res.json(user)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({msg: error.message})
        }
    }

}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.find()
        return res.json(allUsers)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({msg: error.message})
        }
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const user = await User.findOneBy({id: parseInt(req.params.id)})

        if(!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }

        return res.json(user)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({msg: error.message})
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {firstname, lastname} = req.body;
        const user = await User.findOneBy({id: parseInt(req.params.id)})
        
        if(!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }

        await User.update({id: parseInt(req.params.id)}, req.body)
        return res.sendStatus(204)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({msg: error.message})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const result = await User.delete({id: parseInt(req.params.id)})
        
        if(result.affected === 0){
            return res.status(404).json({msg: 'Usuario no encontrado'})
        }

        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({msg: error.message})
        }
    }
}