import { Injectable } from "@angular/core";
import { Action } from "rxjs/internal/scheduler/Action";
import { HttpService } from "../../service/http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { deleteUser, deleteUserFail, deleteUserSuccess, editProfile, editProfileFail, editProfileSuccess, editUser, editUserFail, editUserSuccess, loadUser, loadUserDetails, loadUserDetailsFail, loadUserDetailsSuccess, loadUserFail, loadUserSuccess } from "./user.actions";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects {
    constructor(private action$: Actions, private service: HttpService) {}

    loadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadUser),
            exhaustMap(() =>
                this.service.getAllUser().pipe(
                   map((data: any) => loadUserSuccess({ list: data.users })),

                    catchError(err => of(loadUserFail({ errormessage: err.message })))
                )
            )
        )
    );

  deleteUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      exhaustMap((action) =>
        this.service.deleteUser(action.userId).pipe(
         map((response: any) => deleteUserSuccess({ userId: action.userId, message: response.message })),
          catchError((error) => of(deleteUserFail({ errorMessage: error.message })))
        )
      )
    )
  );
loadUserDetails$ = createEffect(() =>
   this.action$.pipe(
      ofType(loadUserDetails),
      exhaustMap((action) =>
         this.service.getUserInfo(action.userId, action.token).pipe(
            map((user: any) => loadUserDetailsSuccess({ user })),
            catchError((error) => of(loadUserDetailsFail({ errorMessage: error.message })))
         )
      )
   )
);
editUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(editUser),
      switchMap((action) =>
        this.service.editUser(action.userId, action.userData).pipe(
          map(() => editUserSuccess({ userId: action.userId, userData: action.userData })),
          catchError((error) => of(editUserFail({ errorMessage: error.message })))
        )
      )
    )
  );
  editProfile$ = createEffect(() =>
  this.action$.pipe(
    ofType(editProfile),
    exhaustMap(action =>
      this.service.editProfile(action.userId, action.profileData).pipe(
        map(() => editProfileSuccess({ profileData: action.profileData })),
        catchError(error => of(editProfileFail({ errorMessage: error.message })))
      )
    )
  )
);

}