import { Temporal } from '@js-temporal/polyfill';
(globalThis as any).Temporal = Temporal;
import express, { type NextFunction, type Request, type Response } from 'express'
import { isLoggedIn } from '../middlewares/auth.js'
import { db } from '../prisma/db.js';
import { taskInputScheam } from '../utils/zod.js';
//lllllllll

declare global {
    namespace Express {
        interface Request {
            id?: string;
            email?: string;
            createdAt?:Temporal.Instant;
        }
    }
}


//lllllllll

const router = express.Router();
router.use(express.json());
router.post('/',isLoggedIn,async (req:Request,res)=>{
    const result = taskInputScheam.safeParse(req.body);
    if(!result.success){return res.status(409).json({message:JSON.parse(result.error.message)[0].message})}
    const {title,description} = result.data;
    if(!req.id){return res.status(401).json({message:'Unauthorized'})}
    const newTask = await db.orm.public.Task.create({
        completed:false,
        createdAt: Temporal.Now.instant() as any,
        title,
        description,
        userId:req.id
    });
    return res.json({newTask});
})
router.get('/',isLoggedIn,async (req:Request,res)=>{
    const id = req.id;
    const tasks = await db.orm.public.Task.where({userId:id}).all();
    if(tasks.length===0){return res.status(411).json({message:'You may not have any tasks at the moment'})}
    return res.json({tasks});
})
router.get('/:id',isLoggedIn,async (req:Request,res)=>{
    const userId = req.id;
    const id     = req.params.id;
    const foundUser = await db.orm.public.User.where({
        id:userId
    }).include("tasks").first();
    if(!foundUser){return res.json({message:'check authentication'})}
    if(foundUser.tasks.length===0){return res.json({message:'you have no tasks at the moment!'})}
    const foundTask = foundUser.tasks.find((el)=>el.id===id);
    if(!foundTask){return res.status(411).json({message:'asked task not found!'})}
    return res.json({foundTask});
})
router.put('/update/:id',isLoggedIn,async (req:Request,res)=>{
    const result = taskInputScheam.safeParse(req.body);
    if(!result.success){return res.json({message:JSON.parse(result.error.message)[0].message})}
    const {title,description} = result.data;
    const userId = req.id;
    const id = Array.isArray(req.params.id)?req.params.id[0]:req.params.id;
    if(!id){return res.status(403).json({message:'You may check the provided task id'})}
    const updatedTask = await db.orm.public.Task.where({
        id:id,userId
    }).update({title,description,createdAt:Temporal.Now.instant() as any});
    if(!updatedTask){return res.status(411).json({message:'no such task found!'})}
    return res.json({updatedTask});
})
router.delete('/delete/:id',isLoggedIn,async (req:Request,res)=>{
    const userId = req.id;
    const id = Array.isArray(req.params.id)?req.params.id[0]:req.params.id;
    if(!id){return res.status(403).json({message:'You may check the provided task id'})}
    const deletedTask = await db.orm.public.Task.where({
        id,userId
    }).delete();
    if(!deletedTask){return res.status(411).json({message:'You may not have any tasks to delete'})}
    return res.json({deletedTask});
})
router.delete('/delete',isLoggedIn,async (req:Request,res)=>{
    const id = req.id;
    const deletedTasks = await db.orm.public.Task.where({
        userId:id
    }).deleteAll();
    if(!deletedTasks){return res.status(500).json({message:'error in deleting tasks'})}
    if(deletedTasks.length===0){return res.status(411).json({message:'You may not have any tasks to delete'})}
    return res.json({deletedTasks});
})

export const taskRouter = router;
