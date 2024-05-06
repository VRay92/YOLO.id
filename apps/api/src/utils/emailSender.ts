import path from "path";
import { transporter } from "../lib/nodemailer";
import fs from "fs";
import handlebars from "handlebars";


export const sendEmail = async (email: string, subject: string, content: string | null, data?: { username: string; otp?: string; link: string }) => {
    try {
        const templatePath = path.join(__dirname, "../templates", "register.hbs")
        const templateSource = await fs.readFileSync(templatePath, "utf-8");
        const compiledTemplate = handlebars.compile(templateSource);
        const html = compiledTemplate(data)
        await transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: email,
            subject,
            html: content || html,
        })
    } catch (error) {
        throw error;
    }
}

export const forgotPassword = async (email: string, subject: string, content: string | null, data?: { username: string; otp?: string; link: string }) => {
    try {
        const templatePath = path.join(__dirname, "../templates", "forgotpassword.hbs")
        const templateSource = await fs.readFileSync(templatePath, "utf-8");
        const compiledTemplate = handlebars.compile(templateSource);
        const html = compiledTemplate(data)
        await transporter.sendMail({
            from: process.env.MAIL_SENDER,
            to: email,
            subject,
            html: content || html,
        })
    } catch (error) {
        throw error;
    }
}