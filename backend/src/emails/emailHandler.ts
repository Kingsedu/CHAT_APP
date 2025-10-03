import { resendClient } from '../libs/resend';
import { email_from, email_from_name } from '../config/config';
import { createWelcomeEmailTemplate } from './emailTemplates';
export const sendWelcomeEmail = async (
  email: string,
  name: string,
  clientURL: string,
) => {
  const { data, error } = await resendClient.emails.send({
    from: `${email_from_name} <${email_from}>`,
    to: 'chinedumeh26@yahoo.com',
    subject: 'Welcome to CHAT_APP',
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if (error) {
    console.error('Error sending welcome emails:', error);
    throw new Error('Failed to send welcome email');
  }

  console.log('welcome Email sennt successfully', data);
};
