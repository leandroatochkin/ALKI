import dotenv from 'dotenv';
dotenv.config();
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
console.log(process.env.RESEND_API_KEY)
export const sendEmail = async (to, subject, body) => {
    try{
    await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [to],
                subject: subject,
                html: body,
                });
    

    } catch (e) {
        console.error(e)
        return
    }
} 