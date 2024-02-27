import { userModel } from "../../model/user";

export const userState: userModel = {
    list: [],
    errormessage: '',
    userDetails: null ,
    editdata:{
        code: "",
        id:'',
        name: "",
        email: "",
        phoneNumber: "" 
    }
}