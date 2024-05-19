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
        const check = await prisma.event.findFirst({
            where: data,
        })
        return check
    } catch (error) {
        throw error;
    }
}

export const getLastEventId = async () => {
    try {
        const lastEvent = await prisma.event.findFirst({
            orderBy: { id: 'desc' }
        });

        if (lastEvent) {
            const lastEventId = lastEvent.id;
            return lastEventId
        } else {
            console.log("No events found in the database.");
        }
    } catch (error) {

    }
}