import { EmailActionsEnum } from './enum';

export const emailInfo = {
    [EmailActionsEnum.WELCOME]: {
        subject: 'Registration',
        html: 'Welcome, registration is successful',
    },
    [EmailActionsEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account is blocked',
        html: 'Oop something going wrong...',
    },
    [EmailActionsEnum.YOU_ARE_LOGINED]: {
        subject: 'Welcome',
        html: 'Welcome, to our platform ',
    },
};
