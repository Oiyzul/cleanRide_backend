import { User_roles } from "./user.constant";

export type TUser = {
    name: string;
    email: string;
    password: string; 
    phone: string;
    role: keyof typeof User_roles
    address: string;
}