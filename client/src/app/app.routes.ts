import { Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdduserComponent } from './pages/adduser/adduser.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { loginGuard } from './routeguard/login.guard';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { roleGuard } from './routeguard/role.guard';

export const routes: Routes = [

    {   path: 'login', component: LoginComponent, 
    },
    {   path: 'signup', component: SignupComponent, 
    },
    {
        path: 'profile', component: UserprofileComponent,canActivate:[loginGuard]
    },
    {   path: 'admin', component: AdminComponent,canActivate:[roleGuard]
    },
    {
        path:'adduser' , component :AdduserComponent,canActivate:[roleGuard]
    },
    {
        path:'edituser/:id',component : EdituserComponent,canActivate:[roleGuard]
    },
    {
        path:'editprofile/:id',component:EditprofileComponent,canActivate:[loginGuard]
    },
    {
        path: '**', redirectTo: 'login'
    },
];
