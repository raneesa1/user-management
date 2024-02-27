import { createAction, props } from "@ngrx/store"

export const LOAD_USER = '[user] load user'
export const LOAD_USER_SUCCESS = '[user] load user success'
export const LOAD_USER_FAIL = '[user] load user fail'

export const loadUser =createAction(LOAD_USER)
export const loadUserSuccess =createAction(LOAD_USER_SUCCESS,props<{list:any[]}>())
export const loadUserFail =createAction(LOAD_USER_FAIL,props<{errormessage:any}>())


export const LOAD_USER_DETAILS = '[User] Load User Details';
export const LOAD_USER_DETAILS_SUCCESS = '[User] Load User Details Success';
export const LOAD_USER_DETAILS_FAIL = '[User] Load User Details Fail';


export const EDIT_USER = '[User] Edit User';
export const EDIT_USER_SUCCESS = '[User] Edit User Success';
export const EDIT_USER_FAIL = '[User] Edit User Fail';


export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: string  }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: string, message: string }>() 
);
export const deleteUserFail = createAction(
  '[User] Delete User Fail',
  props<{ errorMessage: string }>()
);

export const loadUserDetails = createAction(
  LOAD_USER_DETAILS,
  props<{ userId: string ,token: string }>()
);

export const loadUserDetailsSuccess = createAction(
  LOAD_USER_DETAILS_SUCCESS,
  props<{ user: any}>()
);

export const loadUserDetailsFail = createAction(
  LOAD_USER_DETAILS_FAIL,
  props<{ errorMessage: string }>()
);

export const editUser = createAction(
  EDIT_USER,
  props<{ userId: string, userData: any }>()
);

export const editUserSuccess = createAction(
  EDIT_USER_SUCCESS,
  props<{ userId: string, userData: any }>()
);

export const editUserFail = createAction(
  EDIT_USER_FAIL,
  props<{ errorMessage: string }>()
);

export const EDIT_PROFILE = '[User] Edit Profile';
export const EDIT_PROFILE_SUCCESS = '[User] Edit Profile Success';
export const EDIT_PROFILE_FAIL = '[User] Edit Profile Fail';

export const editProfile = createAction(
  EDIT_PROFILE,
  props<{ userId: string, profileData: any }>()
);

export const editProfileSuccess = createAction(
  EDIT_PROFILE_SUCCESS,
  props<{ profileData: any }>()
);

export const editProfileFail = createAction(
  EDIT_PROFILE_FAIL,
  props<{ errorMessage: string }>()
);
