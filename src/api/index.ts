import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


type Task = {
  id: string;
  title: string;
  completed: boolean;
};


let tasks: Task[] = [];
let nextId = 1;

app.get('/', (req: Request, res: Response) => {
  res.json("Welcome to Mini Tracker Rest API");
});

app.get('/tasks', (req: Request, res: Response) => {
  res.json(tasks);
});


app.post('/tasks', (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const newTask: Task = {
    id: nextId.toString(),
    title,
    completed: false,
  };

  nextId++;
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});


app.delete('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Task tracker backend running at http://localhost:${PORT}`);
});
