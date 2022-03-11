"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1)Повторіть всі ендпоінти як в мене
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comment_1 = require("./entity/comment");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .find();
    res.json(users);
});
app.post('/users', async (req, res) => {
    const newUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .save(req.body);
    res.json(newUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email, } = req.body;
    const updatedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .update({ id: Number(req.params.id) }, {
        password,
        email,
    });
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    const deletedUser = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deletedUser);
});
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
app.get('/posts/:userId', async (req, res) => {
    const posts = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .find({ where: { userId: Number(req.params.userId) } });
    res.json(posts);
});
// 4)update /posts/userId можна оновити текст про пост
app.patch('/posts/:userId', async (req, res) => {
    const { text, } = req.body;
    const updatedPost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .update({ id: Number(req.params.userId) }, {
        text,
    });
    res.json(updatedPost);
});
// 5)get comments/userId вивести коментарі які належать юзеру
// який їх написав і пости в яких вони написані
// (якщо через квері почитаєте як там зробити мulti select)
app.get('/comments/:userId', async (req, res) => {
    const commentsWithPosts = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
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
app.patch('/comments/action', async (req, res) => {
    const { commentId, action, } = req.body;
    const commentToChange = await (0, typeorm_1.getManager)()
        .getRepository(comment_1.Comment)
        .findOne({ where: { id: commentId } });
    if (action === 'like') {
        const counter = await (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .update({ id: commentId }, {
            likes: Number(commentToChange?.likes) + 1,
        });
        res.json(counter);
    }
    if (action === 'dislike') {
        const counter = await (0, typeorm_1.getManager)()
            .getRepository(comment_1.Comment)
            .update({ id: commentId }, {
            dislikes: Number(commentToChange?.dislikes) + 1,
        });
        res.json(counter);
    }
});
app.listen(5000, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('DB connected');
        }
    }
    catch (err) {
        if (err) {
            console.error(err);
        }
    }
});
//# sourceMappingURL=app.js.map