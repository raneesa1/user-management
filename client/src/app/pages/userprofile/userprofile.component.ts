import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { AuthServiceService } from '../../service/auth-service.service';
import jwt_decode from 'jwt-decode';
import { concatAll } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserDetails } from '../../store/user/user.selector';
import { loadUserDetails } from '../../store/user/user.actions';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
   user: any;

  constructor(private store:Store,private httpService: HttpService , private jwtService : AuthServiceService ,private router:Router) { }

  ngOnInit(): void {
    this.getUserDetails();
  }
getUserDetails(): void {
    const token = this.jwtService.getToken(); 

    if (token) {
        const userId = this.jwtService.getUserIdFromToken(token);
        console.log(userId, "user id passing to the server");
        console.log(token, "token sending to the server side ");
        
        if (userId) {
            this.store.dispatch(loadUserDetails({ userId, token }));
            this.store.select(getUserDetails).subscribe(user => {
                this.user = user;
                console.log(this.user, "consoling this.user");
                console.log(user, "consoling the user ");
            });
        }
    }
}

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login'])

  }

  editProfile(userId:string):void{
  console.log(userId)
    this.router.navigate(['/editprofile', userId]);
}

}



