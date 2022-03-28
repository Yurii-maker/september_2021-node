import { emailActionsEnum } from './enum';

export const emailInfo = {
    [emailActionsEnum.WELCOME]: {
        subject: 'Registration',
        html: 'Welcome, registration is successful',
    },
    [emailActionsEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account is blocked',
        html: 'Oop something going wrong...',
    },
    [emailActionsEnum.YOU_ARE_LOGINED]: {
        subject: 'Welcome',
        html: 'Welcome, to our platform ',
    },
};
