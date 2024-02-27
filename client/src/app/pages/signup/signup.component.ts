import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../service/auth-service.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  
constructor(private http:HttpService,private router:Router,private builder : FormBuilder, private toastrService: ToastrService
) {}

HttpService = inject(HttpService)
toasterService=inject(ToastrService)



name : string = ''
email : string = ''
password : string = ''
confirmPassword : string = ''
phoneNumber!: number;

authService=inject(AuthServiceService)


ngOnInit(){
   if(this.authService.isUser){
      this.router.navigateByUrl('/profile')

    }
    if(this.authService.isAdmin) {
      this.router.navigateByUrl('/admin')
    }
  }
 signupForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('',[Validators.required,Validators.minLength(10)]),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: this.builder.control('', Validators.required),
  })

signup(){
if(this.signupForm.valid){
  let signupData = {
            "name" : this.signupForm.get('name')?.value as string,
            "email" : this.signupForm.get('email')?.value as string,
            "phoneNumber" : this.signupForm.get('phoneNumber')?.value ,
            "password" : this.signupForm.get('password')?.value as string,
            "confirmPassword" : this.signupForm.get('confirmPassword')?.value as string,
        }



  console.log(signupData)
this.http.signup(signupData).subscribe({
      next: (response: any) => {
        this.toastrService.success(response.message); 
        this.router.navigate(['login']);
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