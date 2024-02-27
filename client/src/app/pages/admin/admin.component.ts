import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteUser, loadUser } from '../../store/user/user.actions';
import { getUserList } from '../../store/user/user.selector';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
   
     constructor(private store: Store ,private jwtService : AuthServiceService,private router: Router) { }
      users!: any[];

  ngOnInit(): void {
     this.getAllUsers();
  }

  getAllUsers(): void {
    this.store.dispatch(loadUser())
    this.store.select(getUserList).subscribe({
     next: (users: any[]) => {
        console.log(users, "Response from the store"); // Check if you're getting data here
        this.users = users;
      },
     error:(error: any) => {
        console.error('Error fetching users:', error);
      }
  });
  }
  
  confirmDelete(userId: string): void {
  const result = window.confirm('Are you sure you want to delete this user?');
  if (result) {
    this.deleteUser(userId);
  }
}


 deleteUser(userId: string): void {
  console.log(userId);
  this.store.dispatch(deleteUser({ userId }));
   this.store.dispatch(loadUser());
}
editUser(userId:string):void{
  console.log(userId)
    this.router.navigate(['/edituser', userId]);
}
  

  
}
