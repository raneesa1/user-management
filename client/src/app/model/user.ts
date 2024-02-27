export interface User{
    code?:string;
    id?: string
    name:string;
    email:string;
    phoneNumber:number | string;
    password?:string
    conrifmPassword?:string
}

export interface userModel{
    list:User[],
    errormessage:string,
    editdata:User,
    userDetails?: null 
}