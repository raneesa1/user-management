import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../service/http.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthServiceService } from '../../service/auth-service.service';
import { editProfile } from '../../store/user/user.actions';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss'
})
export class EditprofileComponent {

  userId!: any;
  user: any;
  editedUser: any;
  editProfileForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private store: Store,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      profileImage: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();

    this.http.getUserInfo(this.userId, token).subscribe((userData: any) => {
      this.user = userData;
      this.initializeForm(userData); 
    });
  }

  initializeForm(userData: any): void {
    this.editedUser = { ...userData };
    this.editProfileForm.patchValue({
      name: userData.name
    });
  }

  saveChanges(): void {
  if (this.editProfileForm.valid) {
    const editedUserData = this.editProfileForm.value;
    console.log(editedUserData,"consoling the edited profile data before sending the req")
    this.store.dispatch(editProfile({ userId: this.userId, profileData: editedUserData }));
  } else {
    console.log('Form is invalid');
  }
}


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  }
}