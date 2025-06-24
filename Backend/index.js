import express from 'express';
import cors from 'cors';
import sequelize from "./config/db.js";
import authRouter from "./routers/authRouter.js"
import taskRouter from "./routers/taskRouter.js"


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRouter);
app.use('/api/tasks', taskRouter);


sequelize.sync().then(() => {
    console.log("Database is synced")

}).catch(error=>{
    console.log(error)
});


app.listen(5000, () => {
    console.log('Server running on http://localhost:5000')
});

