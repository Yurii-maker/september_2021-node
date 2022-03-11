// 1)Повторіть всі ендпоінти як в мене
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comment';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager()
        .getRepository(User)
        .find();
    res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
    const newUser = await getManager()
        .getRepository(User)
        .save(req.body);
    res.json(newUser);
});

app.patch('/users/:id', async (req: Request, res: Response) => {
    const {
        password,
        email,
    } = req.body;
    const updatedUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(updatedUser);
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    const deletedUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});

// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив

app.get('/posts/:userId', async (req: Request, res: Response) => {
    const posts = await getManager()
        .getRepository(Post)
        .find({ where: { userId: Number(req.params.userId) } });
    res.json(posts);
});
// 4)update /posts/userId можна оновити текст про пост
app.patch('/posts/:userId', async (req: Request, res: Response) => {
    const {
        text,
    } = req.body;
    const updatedPost = await getManager()
        .getRepository(Post)
        .update({ id: Number(req.params.userId) }, {
            text,
        });
    res.json(updatedPost);
});

// 5)get comments/userId вивести коментарі які належать юзеру
// який їх написав і пости в яких вони написані
// (якщо через квері почитаєте як там зробити мulti select)

app.get('/comments/:userId', async (req: Request, res: Response) => {
    const commentsWithPosts = await getManager()
        .getRepository(Comment)
        // .find({ where: { authorId: Number(req.params.userId) } });
        .find({
            relations: ['post'],
            where: { authorId: Number(req.params.userId) },
        });
    res.json(commentsWithPosts);
});
// *6) update /comments/action написати ендпоінт
// який буде приймати в body commentId,
// action(like, dislike)
// і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі (буде трохи криво бо
// один юзер зможе
// лайкати багато раз один пост
app.patch('/comments/action', async (req: Request, res: Response) => {
    const {
        commentId,
        action,
    } = req.body;
    const commentToChange = await getManager()
        .getRepository(Comment)
        .findOne({ where: { id: commentId } });

    if (action === 'like') {
        const counter = await getManager()
            .getRepository(Comment)
            .update({ id: commentId }, {
                likes: Number(commentToChange?.likes) + 1,
            });

        res.json(counter);
    }
    if (action === 'dislike') {
        const counter = await getManager()
            .getRepository(Comment)
            .update({ id: commentId }, {
                dislikes: Number(commentToChange?.dislikes) + 1,
            });

        res.json(counter);
    }
});

app.listen(5000, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
        }
    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
});
