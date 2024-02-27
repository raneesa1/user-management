import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Store } from '@ngrx/store';
import { editUser } from '../../store/user/user.actions';
import { AuthServiceService } from '../../service/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent {

userId!: any;
userData: any;
editUserForm: FormGroup;


toasterService=inject(ToastrService)

 constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private store: Store,
    private authService: AuthServiceService,
    private builder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.editUserForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('',[Validators.required,Validators.minLength(10)]),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    console.log(token, this.userId, "consoling the token and user id from the client side from edit user");

    this.http.getUserInfo(this.userId, token).subscribe((userData: any) => {
      this.userData = userData;
      console.log(userData);
      this.initializeForm(userData); 
    });
  }

  initializeForm(userData: any): void {
    this.editUserForm.patchValue({
      name: userData.name,
      phoneNumber: userData.phoneNumber,
      email: userData.email
    });
  }

  editUser(): void {
    if (this.editUserForm.valid) {
      const userData = this.editUserForm.value;
      this.http.editProfile(this.userId, userData).subscribe({
        next: (response: any) => {
          this.toastrService.success(response.message); 
          this.router.navigate(['/admin']);
        },
        error: (error: any) => {
          if (error.status === 400) {
            this.toastrService.error(error.error.message);
          } else {
            this.toastrService.error('An error occurred. Please try again later.'); // Generic error message
          }
        }
      });
    } else {
      this.toastrService.error('Please provide valid details');
    }
  }
}