import { Component, inject } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {

constructor(private http:HttpService,private router:Router,private builder : FormBuilder, private toastrService: ToastrService
) {}

HttpService = inject(HttpService)
toasterService=inject(ToastrService)


name : string = ''
email : string = ''
password : string = ''
confirmPassword : string = ''
phoneNumber!: number;

ngOnInit():void{


}
  AddUserForm = this.builder.group({
    name: this.builder.control('', Validators.required),
    phoneNumber: this.builder.control('',[Validators.required,Validators.minLength(10)]),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: this.builder.control('', Validators.required),
  })

AddUser(){
if(this.AddUserForm.valid){
  let NewUserData = {
            "name" : this.AddUserForm.get('name')?.value as string,
            "email" : this.AddUserForm.get('email')?.value as string,
            "phoneNumber" : this.AddUserForm.get('phoneNumber')?.value ,
            "password" : this.AddUserForm.get('password')?.value as string,
            "confirmPassword" : this.AddUserForm.get('confirmPassword')?.value as string,
        }
        console.log(NewUserData,"new data of user")

      
this.http.addUser(NewUserData).subscribe({
      next: (response: any) => {
        this.toastrService.success(response.message); 
        this.router.navigate(['admin']);
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