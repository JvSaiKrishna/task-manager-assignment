import Task from "../models/taskModel.js"

const getTasks = async (req, res) => {
    try {

        const tasks = await Task.findAll({ where: { user_id: req.userId } });
        return res.status(200).json({ tasks });
    } catch (error) {
        return res.status(500).json({ error: "Internal server problem" })
    }
}

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = await Task.create({ title, user_id: req.userId });
        res.status(201).json({task});
    } catch (error) {
        return res.status(500).json({ error: "Internal server problem" })
        
    }
}

const updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findOne({ where: { id: req.params.id, user_id: req.userId } });
        if (!task) return res.status(404).json({ error: 'Task not found' });
        
        task.status = status;
        await task.save();
        res.status(201).json({task});
    } catch (error) {
        return res.status(500).json({ error: "Internal server problem" })

    }

}


export {getTasks,createTask,updateTask}