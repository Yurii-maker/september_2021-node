import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';
import { Post } from './post';

export interface IComment {
    text: string,
    authorId: number,
    postId: number,
    likes: number,
    dislikes: number
}

@Entity('Comments', { database: 'okten' })

export class Comment extends CommonFields implements IComment {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        authorId: number;

    @Column({
        type: 'int',
    })
        postId: number;

    @Column({
        type: 'int',
    })
        likes: number;

    @Column({
        type: 'int',
    })
        dislikes: number;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'authorId' })
        user: User;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
