import prisma from "../../prisma";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "author";
    OTP: string;
    token: string;
}
