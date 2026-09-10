import 'dotenv/config'
import express from 'express'
import { userInputScheam } from '../utils/zod.js';
import { db } from '../prisma/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router();
router.use(express.json());

router.post('/signup',async (req,res)=>{
    const {email,password,name} = req.body;
    const result = userInputScheam.safeParse(req.body);
    if(!result.success){
        const errorMsg = JSON.parse(result.error.message)[0].message;
        return res.status(403).json({message:errorMsg})
    }
    const foundUser = await db.orm.public.User.first({
        email
    });
    if(!foundUser){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const createdUser = await db.orm.public.User.create({
            email,password:hashedPassword,name
        })
        const jwtSecret = process.env.JWT_PASSWORD;
        if(!jwtSecret){return res.status(500).json({message:'unable to acccess JWT_PASSWORD form .env'})}
        const token = jwt.sign({id:createdUser.id,email},jwtSecret);
        const tokenString = "Bearer "+token;
        return res.json({token:tokenString});
    }
    return res.json({message:'user with this email already exist,you may signIn'})
})
router.post('/signin',async (req,res)=>{
    const result = userInputScheam.safeParse(req.body);
    if(!result.success){
        const errorMsg = JSON.parse(result.error.message)[0].message;
        return res.status(403).json({message:errorMsg})
    }
    const {email,password} = result.data;
    const foundUser = await db.orm.public.User.first({email});
    if(!foundUser){return res.status(411).json({message:'you may signup first'})}
    const rightPassword = await bcrypt.compare(password,foundUser.password);
    if(!rightPassword){return res.status(411).json({message:'email or/and password incorrect'})}
    const jwtSecret = process.env.JWT_PASSWORD;
    if(!jwtSecret){return res.status(500).json({message:'unable to access JWT_PASSWORD from .env'})}
    const token = jwt.sign({id:foundUser.id,email},jwtSecret);
    const tokenString = 'Bearer '+ token;
    return res.json({token:tokenString});
})  
export const userRouter = router;
