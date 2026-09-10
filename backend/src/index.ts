import 'dotenv/config.js';
import express from 'express'
import { userRouter } from './routes/user.js';
import { taskRouter } from './routes/task.js';
import cors from 'cors'
const app = express();
//cors
const corsOptions = {origin:'http://localhost:5173'}
app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send('workin fine');
})
app.use('/user',userRouter)
app.use('/task',taskRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`server running at ${PORT}`));