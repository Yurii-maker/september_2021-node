import { Column, Entity, OneToMany } from 'typeorm';

import { CommonFields } from './commonFields';
import { Post } from './post';
import { Comment } from './comment';

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    age?: number,
    phone: string,
    email: string,
    password: string,
    posts: any[]
}

@Entity('Users', { database: 'okten' })

export class User extends CommonFields implements IUser {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        firstName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        lastName: string;

    @Column({
        type: 'int',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        phone: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        password: string;

@OneToMany(() => Post, (post) => post.user)
    posts:Post[];

@OneToMany(() => Comment, (comment) => comment.user)
    comments:Comment[];
}
