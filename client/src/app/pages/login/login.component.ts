import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

constructor(private http:HttpService,private router:Router,private builder : FormBuilder, 
  private toastrService: ToastrService,private jwtService: AuthServiceService,
  
) {}



HttpService = inject(HttpService)
toasterService=inject(ToastrService)
authService=inject(AuthServiceService)


email : string = ''
password : string = ''
 ngOnInit(){
    if(this.authService.isLogged){
      this.router.navigateByUrl('/profile')

    }
  }
loginForm = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', [Validators.required, Validators.minLength(8)]),
})

login(){
if(this.loginForm.valid){
let loginData = {
"email" : this.loginForm.get('email')?.value as string,
"password" : this.loginForm.get('password')?.value as string,
}

console.log(loginData)
this.http.login(loginData).subscribe({
      next: (response: any) => {
         const token = response.accessToken;
         this.jwtService.storeToken(token);
         const role = response.role;
        if (role === 'admin') {
          this.toastrService.success('login successful');
          this.router.navigate(['admin']); 
        } else {
          this.toastrService.success('login successful');
          this.router.navigate(['profile']);
        }
      },
      error: (error: any) => {
        if (error.status === 400) {
          this.toastrService.error(error.error.message);
        } else {
          this.toastrService.error('An error occurred. Please try again later.'); 
        }
      }
    });
  } else {
    this.toastrService.error('Please provide valid details');
  }
}

}
