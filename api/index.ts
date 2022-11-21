import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getXataClient, Feedback } from './xata';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const xata = getXataClient();

app.get('/api/feedback', async (req: Request, res: Response) => {
    const feedback = await xata.db.feedback.getAll();
    res.json(feedback);
});

app.post('/api/feedback', async (req: Request, res: Response) => {
    const feedback = req.body;
    const createdFeedback = await xata.db.feedback.create(feedback);
    res.json(createdFeedback);
});

app.put('/api/feedback/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const feedback = req.body;
    const updatedFeedback = await xata.db.feedback.update(id, feedback);
    res.json(updatedFeedback);
});

app.delete('/api/feedback/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedFeedback = await xata.db.feedback.delete(id);
    res.json(deletedFeedback);
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

app.use(express.static('public'));

module.exports = app;
