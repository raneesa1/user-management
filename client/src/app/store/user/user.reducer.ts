import { createReducer } from "@ngrx/store";
import {userState} from '../../store/user/user.state'
import { on } from "@ngrx/store";
import { deleteUserFail, deleteUserSuccess, editProfileFail, editProfileSuccess, editUserFail, editUserSuccess, loadUser, loadUserDetailsFail, loadUserDetailsSuccess, loadUserFail, loadUserSuccess } from "./user.actions";
import { userModel } from "../../model/user";



const initialState: userModel = {
    list: [],
    errormessage: '',
    editdata: {
        code: "",
        name: "",
        email: "",
        phoneNumber: ""
    },
     userDetails: null 
};
const _userReducer = createReducer(
    initialState,
    on(loadUserSuccess, (state, action) => ({
        ...state,
        list: action.list,
        errormessage: '',
    })),
    on(loadUserFail, (state, action) => ({
        ...state,
        list: [],
        errormessage: action.errormessage
    })),
    on(deleteUserSuccess, (state, action) => ({
        ...state,
        list: state.list.filter(user => user.id !== action.userId) // Remove deleted user from list
    })),
    on(deleteUserFail, (state, action) => ({
        ...state,
        errormessage: action.errorMessage
    })),
    on(loadUserDetailsSuccess, (state, action) => ({
   ...state,
   userDetails: action.user
})),
on(loadUserDetailsFail, (state, action) => ({
   ...state,
   userDetails: null,
   errorMessage: action.errorMessage
})),
on(editUserSuccess, (state, action) => ({
    ...state,
})),
  on(editUserFail, (state, action) => ({
    ...state,
  })),
  on(editProfileSuccess, (state, { profileData }) => ({ ...state, userDetails: profileData })),
  on(editProfileFail, (state, { errorMessage }) => ({ ...state, errorMessage })),
  
);


export function userReducer(state: userModel | undefined, action: any) {
    return _userReducer(state, action);
}

