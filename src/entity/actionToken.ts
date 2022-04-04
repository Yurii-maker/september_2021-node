import {
    Column, Entity, JoinColumn, OneToOne,
} from 'typeorm';

import { CommonFields } from './commonFields';
import { User } from './user';

export interface IActionToken {
    actionToken: string,
    userId: number,
}

@Entity('ActionTokens', { database: 'okten' })

export class ActionToken extends CommonFields implements IActionToken {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        actionToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
