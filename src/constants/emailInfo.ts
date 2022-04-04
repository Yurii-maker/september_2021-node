import { EmailActionsEnum } from './enum';

export const emailInfo = {
    [EmailActionsEnum.WELCOME]: {
        subject: 'Registration',
        templateName: 'welcome',
    },
    [EmailActionsEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account is blocked',
        templateName: 'accountBlocked',
    },
    [EmailActionsEnum.YOU_ARE_LOGINED]: {
        subject: 'You are logined',
        templateName: 'welcome',
    },
    [EmailActionsEnum.NEW_PASSWORD]: {
        subject: 'Dont worry',
        templateName: 'forgotPassword',
    },
};
