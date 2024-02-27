import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "../../model/user";


const getUserState = createFeatureSelector<userModel>('user')

export const getUserList = createSelector(
    getUserState,
    (state: userModel) => state.list
);
export const getUserDetails = createSelector(
  getUserState,
  (state: userModel) => state.userDetails
);
