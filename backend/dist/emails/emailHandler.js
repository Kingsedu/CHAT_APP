"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const resend_1 = require("../libs/resend");
const config_1 = require("../config/config");
const emailTemplates_1 = require("./emailTemplates");
const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resend_1.resendClient.emails.send({
        from: `${config_1.email_from_name} <${config_1.email_from}>`,
        to: 'chinedumeh26@yahoo.com',
        subject: 'Welcome to CHAT_APP',
        html: (0, emailTemplates_1.createWelcomeEmailTemplate)(name, clientURL),
    });
    if (error) {
        console.error('Error sending welcome emails:', error);
        throw new Error('Failed to send welcome email');
    }
    console.log('welcome Email sennt successfully', data);
};
exports.sendWelcomeEmail = sendWelcomeEmail;
