// USER
export interface IUser {
    id: number;
    name: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    status: string;
}

// login
export interface ILogin {
    username: string;
    password: string;
}