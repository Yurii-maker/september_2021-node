import nodemailer from 'nodemailer';

import { emailActionsEnum } from '../constants/enum';
import { emailInfo } from '../constants/emailInfo';
import { config } from '../configs/config';

class EmailService {
    sendMail(userMail:string, action:emailActionsEnum) {
        const { subject, html } = emailInfo[action];
        const emailTransporter = nodemailer.createTransport({
            from: 'PLATFORM',
            service: 'gmail',
            auth: {
                user: config.ROOT_EMAIL,
                pass: config.ROOT_EMAIL_PASSWORD,
            },
        });
        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}
export const emailService = new EmailService();
