import prisma from "../../prisma";

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "author";
    OTP: string;
    token: string;
}

export const getUniqueUser = async (data: any) => {
    try {
        const check = await prisma.user.findUnique({
            where: data,
        })
        return check;
    } catch (error) {
        throw error;
    }
};

export const getUniqueEvent = async (data: any) => {
    try {
        const check = await prisma.event.findUnique({
            where: data,
        })
        return check
    } catch (error) {
        throw error;
    }
}

