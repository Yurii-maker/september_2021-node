import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { EmailActionsEnum } from '../constants/enum';
import { emailInfo } from '../constants/emailInfo';
import { config } from '../configs/config';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: { root: path.join(__dirname, '../', 'emailTemplates') },
    });

    async sendMail(userMail:string, action:EmailActionsEnum, context = {})
        :Promise<SentMessageInfo> {
        Object.assign(context, { googleUrl: 'https://www.google.com.ua/' });
        const { subject, templateName } = emailInfo[action];
        const html = await this.templateRenderer.render(templateName, context);
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
